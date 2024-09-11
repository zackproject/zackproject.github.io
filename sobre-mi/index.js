function showProject() {
  const hideProject = document.getElementsByClassName("hide-project");
  for (let i = 0; i < hideProject.length; i++) {
    const element = hideProject[i];
    element.style.display = "flex";
  }

  document.getElementById("btn-hide-project").style.display = "none";
}
