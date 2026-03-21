
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
