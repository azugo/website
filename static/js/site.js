(function() {
  document.addEventListener('DOMContentLoaded', function() {
    let tabs = document.getElementsByClassName('code-tabs');
    for (let i = 0; i < tabs.length; i += 1) {
      let tabList = tabs[i].querySelector('.nav-tabs');
      if (tabList === null) {
        continue;
      }
      tabs[i].querySelectorAll('.tab-pane').forEach(function(tabPane, idx) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.innerText = tabPane.getAttribute('title');
        li.appendChild(a);
        a.addEventListener('click', function(e) {
          e.preventDefault();
          a.parentNode.parentNode.querySelectorAll('li').forEach(function(li) {
            li.classList.remove('active');
          });
          a.parentNode.classList.add('active');
          tabPane.parentNode.querySelectorAll('.tab-pane').forEach(function(tabPane) {
            tabPane.classList.remove('active');
          });
          tabPane.classList.add('active');
        });
        tabList.appendChild(li);
        if (idx == 0) {
          li.classList.add('active');
          tabPane.classList.add('active');
        }
      });
    }
  });
})();
