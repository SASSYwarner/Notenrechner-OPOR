document.querySelectorAll('.sidenav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // stop page jump

    const section = link.dataset.section;
    console.log('Clicked:', section);
  });
});

const user = localStorage.getItem("opor_current_user");
const users = JSON.parse(localStorage.getItem("opor_users"));

users[user].data.points = value;

localStorage.setItem("opor_users", JSON.stringify(users));
