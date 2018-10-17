export default `
html {
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
}

body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1rem;
}

h1 {
  line-height: 2rem;
  display: inline-block;
}

h2 {
  line-height: 1.5rem;
  display: inline-block;
}

.app {
  display: grid;
  grid-template-columns: 20% 80%;
}

@media (max-width: 700px) {
  .app {
    grid-template-columns: unset;
  }
}

.navbar {
  padding: .5rem;
}

.navbar .nav-link {
  padding: .5rem;
}

.header {
  height: 80px;
  overflow: auto;
  background: #aaa;
}

.container {
  height: 500px;
  background: #ddd;
}

.gap {
  height: 500px;
}

.gap.short {
  height: 250px;
}

.gap.tall {
  height: 1000px;
}

.container.relative {
  overflow-y: auto;
}

.column {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 10px;
}

.sidebar {
  flex-shrink: 0;
  width: 100px;
  background: #ddd;
  margin-right: 20px;
}

.scroll-container {
  overflow-y: scroll;
}

.wrapper {
  display: flex;
  flex: 1 1 auto;
  height: 100vh;
}

.row-no-wrap {
  display: flex;
  flex-direction: row;
}

.row {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

@media (min-width: 768px) {
  .row {
    flex-direction: unset;  
  }
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}

@media (min-width: 768px) {
  .col-sm-4 {
    flex: 0 0 calc(100% / 12 * 4);
    max-width: calc(100% / 12 * 4);
  }  
}

@media (min-width: 768px) {
  .col-sm-8 {
    flex: 0 0 calc(100% / 12 * 8);
    max-width: calc(100% / 12 * 8);
  }  
}

`;
