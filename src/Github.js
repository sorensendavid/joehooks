const path = require('path')

export const getChanges = (body) => {
  const github = body
  const changed = new Map()
  const added = []
  const modified = []
  const removed = []
  const paths = []

  github.commits.forEach((commit) => {
    added.push(...commit.added)
    modified.push(...commit.modified)
    removed.push(...commit.removed)
  })

  changed
    .set('added', added.filter((item, index) => added.indexOf(item) === index))
    .set('modified', modified.filter((item, index) => modified.indexOf(item) === index))
    .set('removed', removed.filter((item, index) => removed.indexOf(item) === index))

  changed.forEach(group => {
    group.forEach(change => {
      paths.push(path.dirname(change))
    })
  })

  changed.set('paths', paths.filter((item, index) => paths.indexOf(item) === index))

  return changed
}
