import { formattedBio } from "./ArtistCardUtils"

describe("Testing formattedBio", () => {
  it("handles no argument", () => {
    expect(formattedBio()).toBe("")
  })

  it("handles no argument", () => {
    expect(formattedBio("French")).toBe("French")
  })

  it("handles no argument", () => {
    expect(formattedBio("French", "1920")).toBe("French 1920")
  })

  it("handles no argument", () => {
    expect(formattedBio("French", "1920", "1940")).toBe("French 1920 - 1940")
  })
})
