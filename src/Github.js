import { message } from './Discord'
const path = require('path')

const testJSON = {
  "ref": "refs/heads/master",
  "before": "01802e0f10484b32c549d4b9d7d9e2861b83918d",
  "after": "17cf1913518743d5eeb8301bbd783bf9afd8d6ef",
  "repository": {
    "id": 219761092,
    "node_id": "MDEwOlJlcG9zaXRvcnkyMTk3NjEwOTI=",
    "name": "Pitter_Pats",
    "full_name": "sorensendavid/Pitter_Pats",
    "private": false,
    "owner": {
      "name": "sorensendavid",
      "email": "mr.sorensen.david@gmail.com",
      "login": "sorensendavid",
      "id": 24687414,
      "node_id": "MDQ6VXNlcjI0Njg3NDE0",
      "avatar_url": "https://avatars1.githubusercontent.com/u/24687414?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sorensendavid",
      "html_url": "https://github.com/sorensendavid",
      "followers_url": "https://api.github.com/users/sorensendavid/followers",
      "following_url": "https://api.github.com/users/sorensendavid/following{/other_user}",
      "gists_url": "https://api.github.com/users/sorensendavid/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/sorensendavid/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sorensendavid/subscriptions",
      "organizations_url": "https://api.github.com/users/sorensendavid/orgs",
      "repos_url": "https://api.github.com/users/sorensendavid/repos",
      "events_url": "https://api.github.com/users/sorensendavid/events{/privacy}",
      "received_events_url": "https://api.github.com/users/sorensendavid/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/sorensendavid/Pitter_Pats",
    "description": null,
    "fork": false,
    "url": "https://github.com/sorensendavid/Pitter_Pats",
    "forks_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/forks",
    "keys_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/teams",
    "hooks_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/hooks",
    "issue_events_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/issues/events{/number}",
    "events_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/events",
    "assignees_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/assignees{/user}",
    "branches_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/branches{/branch}",
    "tags_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/tags",
    "blobs_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/languages",
    "stargazers_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/stargazers",
    "contributors_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/contributors",
    "subscribers_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/subscribers",
    "subscription_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/subscription",
    "commits_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/contents/{+path}",
    "compare_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/merges",
    "archive_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/downloads",
    "issues_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/issues{/number}",
    "pulls_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/labels{/name}",
    "releases_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/releases{/id}",
    "deployments_url": "https://api.github.com/repos/sorensendavid/Pitter_Pats/deployments",
    "created_at": 1572963057,
    "updated_at": "2019-11-20T14:31:04Z",
    "pushed_at": 1574262247,
    "git_url": "git://github.com/sorensendavid/Pitter_Pats.git",
    "ssh_url": "git@github.com:sorensendavid/Pitter_Pats.git",
    "clone_url": "https://github.com/sorensendavid/Pitter_Pats.git",
    "svn_url": "https://github.com/sorensendavid/Pitter_Pats",
    "homepage": null,
    "size": 1562787,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "Shell",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "stargazers": 0,
    "master_branch": "master"
  },
  "pusher": {
    "name": "sorensendavid",
    "email": "mr.sorensen.david@gmail.com"
  },
  "sender": {
    "login": "sorensendavid",
    "id": 24687414,
    "node_id": "MDQ6VXNlcjI0Njg3NDE0",
    "avatar_url": "https://avatars1.githubusercontent.com/u/24687414?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/sorensendavid",
    "html_url": "https://github.com/sorensendavid",
    "followers_url": "https://api.github.com/users/sorensendavid/followers",
    "following_url": "https://api.github.com/users/sorensendavid/following{/other_user}",
    "gists_url": "https://api.github.com/users/sorensendavid/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/sorensendavid/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/sorensendavid/subscriptions",
    "organizations_url": "https://api.github.com/users/sorensendavid/orgs",
    "repos_url": "https://api.github.com/users/sorensendavid/repos",
    "events_url": "https://api.github.com/users/sorensendavid/events{/privacy}",
    "received_events_url": "https://api.github.com/users/sorensendavid/received_events",
    "type": "User",
    "site_admin": false
  },
  "created": false,
  "deleted": false,
  "forced": false,
  "base_ref": null,
  "compare": "https://github.com/sorensendavid/Pitter_Pats/compare/01802e0f1048...17cf19135187",
  "commits": [
    {
      "id": "04088c0c1e368d72aa4818eb0e6d2ee96a1234a3",
      "tree_id": "5ca76ee250f35b720f1a4a50a8d4e3e8a22d4b9d",
      "distinct": true,
      "message": "Remove Testing Files (Webhook Test)",
      "timestamp": "2019-11-20T10:01:45-05:00",
      "url": "https://github.com/sorensendavid/Pitter_Pats/commit/04088c0c1e368d72aa4818eb0e6d2ee96a1234a3",
      "author": {
        "name": "David",
        "email": "mr.sorensen.david@gmail.com",
        "username": "sorensendavid"
      },
      "committer": {
        "name": "David",
        "email": "mr.sorensen.david@gmail.com",
        "username": "sorensendavid"
      },
      "added": [

      ],
      "removed": [
        "Mods/New Folder/another.txt",
        "Mods/New Folder/file.txt",
        "Mods/newfile.txt"
      ],
      "modified": [

      ]
    },
    {
      "id": "4f30350ff1edb1b6c4b51e418e17504d35d71718",
      "tree_id": "bc66f1ac2b48d8c8a37dfd3deda51421d6a00bbd",
      "distinct": true,
      "message": "Add Some Test Files (Webhook Testing)",
      "timestamp": "2019-11-20T10:03:01-05:00",
      "url": "https://github.com/sorensendavid/Pitter_Pats/commit/4f30350ff1edb1b6c4b51e418e17504d35d71718",
      "author": {
        "name": "David",
        "email": "mr.sorensen.david@gmail.com",
        "username": "sorensendavid"
      },
      "committer": {
        "name": "David",
        "email": "mr.sorensen.david@gmail.com",
        "username": "sorensendavid"
      },
      "added": [
        "Mods/modname/modfile1.txt",
        "Mods/modname/modfile2.txt",
        "Mods/somefile.txt"
      ],
      "removed": [

      ],
      "modified": [
        "Mods/modname/modfile1.txt",
        "Mods/modname/modfile2.txt",
        "Mods/somefile.txt"
      ]
    },
    {
      "id": "17cf1913518743d5eeb8301bbd783bf9afd8d6ef",
      "tree_id": "f8ffb7bb7e2272090c4e2e210d684e58f53f759f",
      "distinct": true,
      "message": "Modify Test Files (Webhook Testing)",
      "timestamp": "2019-11-20T10:04:00-05:00",
      "url": "https://github.com/sorensendavid/Pitter_Pats/commit/17cf1913518743d5eeb8301bbd783bf9afd8d6ef",
      "author": {
        "name": "David",
        "email": "mr.sorensen.david@gmail.com",
        "username": "sorensendavid"
      },
      "committer": {
        "name": "David",
        "email": "mr.sorensen.david@gmail.com",
        "username": "sorensendavid"
      },
      "added": [

      ],
      "removed": [

      ],
      "modified": [
        "Mods/modname/modfile1.txt",
        "Mods/modname/modfile2.txt",
        "Mods/somefile.txt"
      ]
    }
  ],
  "head_commit": {
    "id": "17cf1913518743d5eeb8301bbd783bf9afd8d6ef",
    "tree_id": "f8ffb7bb7e2272090c4e2e210d684e58f53f759f",
    "distinct": true,
    "message": "Modify Test Files (Webhook Testing)",
    "timestamp": "2019-11-20T10:04:00-05:00",
    "url": "https://github.com/sorensendavid/Pitter_Pats/commit/17cf1913518743d5eeb8301bbd783bf9afd8d6ef",
    "author": {
      "name": "David",
      "email": "mr.sorensen.david@gmail.com",
      "username": "sorensendavid"
    },
    "committer": {
      "name": "David",
      "email": "mr.sorensen.david@gmail.com",
      "username": "sorensendavid"
    },
    "added": [

    ],
    "removed": [

    ],
    "modified": [
      "Mods/modname/modfile1.txt",
      "Mods/modname/modfile2.txt",
      "Mods/somefile.txt"
    ]
  }
}

export const logCommits = (body) => {
  const github = JSON.parse(body)
  const logMessage = []
  logMessage.push(`Deploying ${github.commits.length} commits pushed by ${github.pusher.name}.`)

  for (let i = 0; i < github.commits.length; i++) {
    let message = `> ${github.commits[i].id.substring(0, 7)} ${github.commits[i].message}`
    logMessage.push(message)
  }

  message(logMessage.join('\n'))
}

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
