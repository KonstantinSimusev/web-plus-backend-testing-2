import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      // реализуйте тест-кейс
      // Act
      const result = postsService.findMany();

      // Assert
      expect(result).toHaveLength(posts.length);
      expect(result).toEqual(
        expect.arrayContaining(
          posts.map((post) => ({
            id: expect.any(String),
            text: post.text,
          }))
        )
      );
    });

    it("should return correct posts for skip and limit options", () => {
      // реализуйте тест-кейс
      // Act
      const result = postsService.findMany({ skip: 1, limit: 2 });

      // Assert
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: expect.any(String), text: "Post 2" },
        { id: expect.any(String), text: "Post 3" },
      ]);
    });

    // реализуйте недостающие тест-кейсы
    it("should handle limit option correctly", () => {
      // Act
      const result = postsService.findMany({ limit: 2 });

      // Assert
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: expect.any(String), text: "Post 1" },
        { id: expect.any(String), text: "Post 2" },
      ]);
    });

    it("should handle large skip value gracefully", () => {
      // Act
      const result = postsService.findMany({ skip: 10 });

      // Assert
      expect(result).toHaveLength(0);
    });

    it("should handle large limit value", () => {
      // Act
      const result = postsService.findMany({ limit: 10 });

      // Assert
      expect(result).toHaveLength(posts.length);
    });

    it("should handle negative skip value", () => {
      // Act
      const result = postsService.findMany({ skip: -2 });

      // Assert
      expect(result).toHaveLength(4); // Должен игнорировать отрицательное значение
    });

    // it("should handle negative limit value", () => {
    //   // Act
    //   const result = postsService.findMany({ limit: -2 });

    //   // Assert
    //   expect(result).toHaveLength(0); // Должен возвращать пустой массив
    // });

    // it("should handle zero skip value", () => {
    //   // Act
    //   const result = postsService.findMany({ skip: 0 });

    //   // Assert
    //   expect(result).toHaveLength(4);
    // });

    // it("should handle zero limit value", () => {
    //   // Act
    //   const result = postsService.findMany({ limit: 0 });

    //   // Assert
    //   expect(result).toHaveLength(0);
    // });
  });
});
