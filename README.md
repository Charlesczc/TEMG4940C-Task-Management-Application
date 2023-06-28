# Part 1: Task Management Application 

First project in front-end HTML, CSS, ReactJS 😶‍🌫️🫠


## >Tasks

#### As a user, I want to be able to view three tasks in three separate lists: “To Do”,    “In progress” and “Archived”. ✅

- 3 columns 3 lists.

#### As a user, I want to be able to add cards to a list to represent individual tasks. ✅

- Add card by clicking the grey box at the bottom of corresponding list. Double click to edit card content.
- Card can be removed by dragging to the bin at the bottom left corner. 🗑️

#### As a user, I want to be able to edit the details of a card, i.e. its title and description. ✅

- Double click the target card to edit the title and description at any time.

#### As a user, I want to be able to move cards between lists to indicate changes in their status or priority. ✅

- Simply drag the card across the lists.
- ⚠️ No changes would be saved if in search. ⚠️

#### As a user, I want to be able to drag and drop cards within a list to reorder them. ✅

- Simply drag the card within the list.
- ⚠️ No changes would be saved if in search. ⚠️

#### As a user, I want to be able to search for cards based on keywords in their title or description. ✅

- Search bar on top of the 3 lists.
- Real time update.

#### As a user, I want my data to persist locally, even after refreshing the page. ✅

- Cards are saved locally.
- ⚠️The data is saved in browser local storage, make sure stick with one browser to ensure the consistency. ⚠️



## Appendix

The HTML file is in ./taskmanage/public.

In the ./taskmanage/src:  
- The root would be the index.js.

- The App.js is where the code of the main interface at. With a general css file App.css.

- Code for the 3 lists is in the List.js.

- Code for the cards is in the Listitem.js.

- Code for the edit screen when double clicking the card is in Popup.js. With a seperate css file Popup.css.
