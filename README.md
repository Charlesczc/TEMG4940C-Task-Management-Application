[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Doi3dWpw)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11472975&assignment_repo_type=AssignmentRepo)

https://charlesczc.github.io/TEMG4940C-Task-Management-Application/

# Part 1: Task Management Application

First project in front-end HTML, CSS, ReactJS 😶‍🌫️🫠

## >Tasks

#### As a user, I want to be able to view three tasks in three separate lists: “To Do”, “In progress” and “Archived”. ✅

- 3 columns 3 lists.

#### As a user, I want to be able to add cards to a list to represent individual tasks. ✅

- Add card by clicking the grey box at the bottom of corresponding list. Double click to edit card content.
- Card can be removed by dragging to the bin at the bottom left corner. 🗑️

#### As a user, I want to be able to edit the details of a card, i.e. its title and description. ✅

- Double click the target card to edit the title and description at any time.

#### As a user, I want to be able to move cards between lists to indicate changes in their status or priority. ✅

- Simply drag the card across the lists.
- ⚠️ NO changes would be saved if in search. ⚠️
- ⚠️ Make sure empty the search bar before drag. ⚠️

#### As a user, I want to be able to drag and drop cards within a list to reorder them. ✅

- Simply drag the card within the list.
- ⚠️ NO changes would be saved if in search. ⚠️
- ⚠️ Make sure empty the search bar before drag. ⚠️

#### As a user, I want to be able to search for cards based on keywords in their title or description. ✅

- Search bar on top of the 3 lists.
- Real time update.

#### As a user, I want my data to persist locally, even after refreshing the page. ✅

- Cards are saved locally.
- ⚠️ The data is saved in browser local storage, make sure stick with one browser to ensure the consistency. ⚠️
- ⚠️ DO NOT use incognito browser. ⚠️
- ⚠️ Cleaning browser storage would remove cards stored. ⚠️

## Appendix

The HTML file is in ./taskmanage/public.

In the ./taskmanage/src:

- The root would be the index.js.

- The App.js is where the code of the main interface at. With a general css file App.css.

- Code for the 3 lists is in the List.js.

- Code for the cards is in the Listitem.js.

- Code for the edit screen when double clicking the card is in Popup.js. With a seperate css file Popup.css.
