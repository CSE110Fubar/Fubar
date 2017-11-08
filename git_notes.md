# Git is your friend :)
Generally you don't want to work on the 'master' branch because we want to 
make sure that the 'master' branch always works. Instead you'll want to
create your own feature branch and then once you're done, commit that branch
and merge it into dev. Once it's in dev, we'll test it and make sure that
everything works before we merge it into master.

After cloning the project you want to checkout the dev branch
THIS STEP IS IMPORTANT: You need to make sure that you are not working in the “master” branch. You should never be modifying the “master” branch. The “dev” branch is where new features will be implemented. The “master” branch will be the production code base, where code should only be merged there once it is tested thoroughly.

```$ git checkout dev```

```$ git branch```

You should see a “dev” and a “master” branch

Whenever you develop a new feature, you should create a new feature branch.
For feature branch names we will stick to the convention of “page-feature” e.g. Search bar on the Cause page might have a branch name like “Cause_Page-searchbar”.

```$ git checkout -b [new-branch-name]```

After adding your feature you’ll want to add all the files that you changed.
To add all files in your directory:

```$ git add . ```

To add specific files in your directory:

```$ git add <filename>```

To commit the changes and then switch back to the dev branch

```$ git commit -m <your-message>```

```$ git checkout dev```


Pull from the dev branch to make sure you have the most updated version. This will pull the latest changes from the remote repository named “origin”.
There should be no merge conflicts here. If you do receive a merge conflict
error then do a 'git reset --hard' to git rid of all the changes. MAKE SURE
THAT YOU DON'T HAVE ANY UNCOMMITTED CHANGES FROM THE FEATURES THAT YOU ADDED
OTHERWISE THEY WILL BE REMOVED.

```$ git pull origin dev```

Use the following command to merge your feature branch into the dev branch.

```$ git merge [new-branch-name]```

Note: There will most likely be merge conflicts that you will have to resolve if someone pushed their commits to the dev branch.
Git should tell you which files had mergeconflicts. You can either use a gui
tool like 'git mergetools' to fix them or just do it from the commandline
Here's a good primer on that:

https://www.google.com/search?q=merge+conflicts
