## Installation.
##### Make fork from https://github.com/kupolua/BibleNotes.git

```bash
git clone https://github.com/YOUR-GITHUB-LOGIN/BibleNotes.git
cd BibleNotes
npm i
```

## Get started.

```run project
npm start
```

## Get daily plan Bible verses.

```
http://localhost:3000/?numDay=3
```


## To run in development mode. Autologin.


create .env in project root directory and add environment variables
```
REACT_APP_MODE=autologin
REACT_APP_LOGIN=your@email.adress
REACT_APP_PASSWD=yourPassword
```
add .env in .gitignore

## Update your fork from upstream.
```
git fetch upstream
git checkout master
git merge upstream/master
```