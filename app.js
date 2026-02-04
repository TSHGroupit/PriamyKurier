const tabs = document.querySelectorAll(".app-tab");
const screens = document.querySelectorAll(".app-screen");

const activateScreen = (screenName) => {
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenName;
    screen.classList.toggle("active", isActive);
  });

  tabs.forEach((tab) => {
    const isActive = tab.dataset.screenTarget === screenName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateScreen(tab.dataset.screenTarget);
  });
});
