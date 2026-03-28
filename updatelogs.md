
## SAMPLE 1
**Date:** 2026-03-07 15:53:10

- This is an expiremental version of the shell
- This is an approximate of how our desktop shell will look like
- Here are the frameworks used:-
    - Tauri, because the compositor is made in rust, Tauri allows me to connect my shell backend to my compositor without needing an IPC
    - TypeScript was used as my front end language as it catches bugs early and provides a more stabler desktop shell
    - I used Vue for my frontend famework due to its high popularity (more collaboration) and because it is lightweight

---
## SAMPLE 2
**Date:** 2026-03-19 02:03:11

- Fixed panel into component
- ISSUES:-
    - Panel not appearing
    - background immage issues

---
## SAMPLE 2.1
**Date:** 2026-03-19 18:58:10

- Fixed panel issues
- Bug details
    - So, basically, I thought "panel.vue" was somehow inhereting the background immage from app.vue
    - But I figured out that I forgot to set the icon size, hence, the size of the icon became 1920x1080 (because the icon is 1920x1080. its as I want to test out abnormal sizes)
- Renamed files with apropriate, more discriptive names
- NEW BUG: scroll-whell issue

---
## SAMPLE 2.2
**Date:** 2026-03-19 23:49:17

- Fixed the overflow issue

---
## SAMPLE 2.3
**Date:** 2026-03-20 00:16:35

- Added a top-panel
- Fixed some file names

---
## SAMPLE 2.4
**Date:** 2026-03-20 07:14:41

- Added the buttons for top-panel
- The scroll issue hasnt been fixed yet
- Context menu designs have been made

---
## SAMPLE 2.5
**Date:** 2026-03-20 08:50:25

- Added buttons to the panels including a digital clock
- These are the changene on the buttons:-
    - Previously, We had only implemented one wrapper for all the buttons
    - This is bad as I wanted buttons at the left, center and right of the panel
    - Hence, inside the main wrapper, 3 sub-wrappers were made for the left, center and right buttons
    - The center buttons will NOT be completly hidden if the panel is out of focus

---
## SAMPLE 2.6
**Date:** 2026-03-20 19:30:57

- Implemented the context
- Here is how the context works
    - There is a base context in 'src/components/contexts/base-context.vue'
    - It can then be imported to make more specialized contexts
    - For example, the app-context
- The context dosent have a hide feature yet

---
## SAMPLE 2.7
**Date:** 2026-03-21 02:28:43

- Added context menus and logics
- Detials of the context menus:-
    - The Time contexts layouts had been implemented

---
## SAMPLE 2.71
**Date:** 2026-03-21 03:05:29

- Fixed the layout bug

---
## SAMPLE 2.72
**Date:** 2026-03-21 18:27:31

- Added msgs
- Added time-context hide feature

---
## SAMPLE 2.73
**Date:** 2026-03-21 23:51:51

- Completed the time context
- Added the following featurures:-
    - Calander
    - To-do list
- No new issues found in this this sample

---
## SAMPLE 2.74
**Date:** 2026-03-22 17:02:03

- Completed power context
- Fixed some minor issues
- No bugs found in this sample

---
## PLAN 2.74
**Date:** 2026-03-22 18:46:42

- I will be disable the devtools in the official release
- Besides this, everything else should be **Exactly** the same as the official release

---
## SAMPLE 2.75
**Date:** 2026-03-22 18:46:42

- Prevented default action from browser when using shortcuts

---
## SAMPLE 2.8
**Date:** 2026-03-23 13:32:21

- Fixed some variable/attribute names
- Added json feature to automatically fill up the bottom panel based on the content of 'panel_app.json'
- Features of this new feature include:-
    - At the start, it will send the json file
    - Then everytime file changes, the icon array's content will be overwritten with the new data
    - this overwriting is done so we can handle, deleting, adding, the deletion of specific apps position and rearanging with no chance of bugs appearing

---
## SAMPLE 2.81
**Date:** 2026-03-24 09:58:03

- Added feature for the app context to load the apps from your device
- Here are the things done to do this:-
    - used freedesktop
    - used freedesktop_icon
    - bundled local resources for the frontend
    - These 'resources' are just the icons
    - freedesktop/freedesktop_icon is for fetching the icon and attributes of all the apps
- ISSUES:- the icons are not loading properly

---
## SAMPLE 2.82
**Date:** 2026-03-25 01:25:10

- Fixed the app icon issue
- Rearranged the icon:-
    - The issue was that you can access out of project files via tauri
    - So I thought to use a resource_dir but that idea only works for production not development
    - Hence, now im using the built in 'convertFileSrc' tauri function
    - It turns these absoulute files into urls you can use in your frontend
    - WARNING:- when using this technique, BE SURE TO UPDATE THE src-tauri/tauri.conf.json:-
    - update CSP
    - assetProtocol must be enabled and set the scopes

---
## SAMPLE 2.83
**Date:** 2026-03-25 12:23:11

- Everything on the To-Do list is now stored in a json file at 'public/sys_data/tasks.json'

---
## SAMPLE 2.84
**Date:** 2026-03-25 20:59:23

- Corrected updatelog Titles
- Made the contexts have a smooth hovering animation (blur on hover)
- Fixed context appearance and upper panel appearance relation (if any context is visible, the panel will also be visible)

---
## SAMPLE 2.85
**Date:** 2026-03-25 23:56:17

- Added a right-click context
- Added Dev and Production features:-
    - Dev:-
        - Inspect tools
        - Reload tool
    - Production:-
        - Change background
        - others..
- Fixed other minor issues
- emoji support for To-Do list

---
## SAMPLE 2.86
**Date:** 2026-03-26 08:52:55

- The time is now in double digits (01 instead of 1 for example)

---
## SAMPLE 2.87
**Date:** 2026-03-26 11:06:36

- Combined all styles into CSS files (all found in src/styles)
- Here are the files:-
    - Context.css
    - App.css
    - Mini.css
    - Panel.css
    - Var.css   This contains all the vars

---
## SAMPLE 2.88
**Date:** 2026-03-26 22:55:27

- Combined script tags into TypeScript files (all found in src/scripts)
- Here are the files:-
    - App.ts
    - app_context.ts
    - bottom_panel.ts
    - calander.ts
    - time_context.ts
    - todo.ts
    - upper_panel.ts

---
## SAMPLE 2.89 -MAJOR
**Date:** 2026-03-29 00:57:23

- This is a Major update involving various fixes
- First fix:- using system files for icons in bottom panel
    - Used the same ConverFileSrc system as use in the app-context
- Second fix:- Fixed flickering
    - The issue happened as i forgot to setup a transition for opacity in the base-context
- First feature:- The Power panel uses JSON
    - This right now only supports Read
    - when active, there will be a focus

---
