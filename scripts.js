/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"jlqjww6jMHbYMV8G","label":"reddit","bookmarks":[{"id":"MrvOg88QeLAgtsqY","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"FPLVtuBVfnGEjVNm","label":"r/zig","url":"https://www.reddit.com/r/zig/"},{"id":"88xEbyo1DWlPk6Gz","label":"r/rust","url":"https://www.reddit.com/r/rust/"},{"id":"r2X6LPOSudPzd1Ys","label":"r/archlinux","url":"https://www.reddit.com/archlinux"}]},{"id":"RrgLyqymL1NnS3QS","label":"dev","bookmarks":[{"id":"crJATXN2k1KXhC4U","label":"Zig docs","url":"https://ziglang.org/documentation/master/"},{"id":"NJiYy8VMHI72UBlk","label":"Zig stdlib docs","url":"https://ziglang.org/documentation/master/std/#"},{"id":"uhgBxdAfiIia2aM0","label":"gitlab","url":"https://gitlab.com"},{"id":"bwaIC5KGSSq3KXhN","label":"github","url":"https://github.com"}]},{"id":"QP7InEGhOKWPu1xb","label":"socials","bookmarks":[{"id":"lxwFOru9GvMeTObG","label":"protonmail","url":"https://mail.proton.me"},{"id":"2TuvUVHV1V6amODz","label":"mastodon","url":"https://elk.zone"},{"id":"TKUFjR0kEvfzDfDf","label":"Twitter","url":"https://x.com"},{"id":"w2U5wiUa7fCMjY1r","label":"youtube","url":"https://youtube.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
