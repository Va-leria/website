document.querySelector('.form__filter').addEventListener('submit', function(event) {
    event.preventDefault();
    filterVacancies();
  });
  
  function filterVacancies() {
    const keyWord = document.getElementById('key_word').value.toLowerCase();
    const salaryFrom = parseFloat(document.getElementById('from').value);
    const salaryTo = parseFloat(document.getElementById('to').value);
    const vacancies = Array.from(document.querySelectorAll('.vacancies__cart-title'));

    const filteredVacancies = vacancies.filter(vacancy => {
      const div_vacancies__details = vacancy.parentNode.childNodes[7]
      const grandparent = vacancy.parentNode.parentNode
      const title = vacancy.innerText.toLowerCase()
      const vacancies__details = div_vacancies__details.innerText
      let str_salary = vacancies__details.split('|')[1].split('р')[0];
      str_salary = str_salary.replace(/\s/g, "");
      const salary = parseFloat(str_salary);
  
      let matchesKeyword = !keyWord || title.includes(keyWord);
      let matchesSalary = (!salaryFrom || salary >= salaryFrom) && (!salaryTo || salary <= salaryTo);
      console.log(matchesKeyword)
      if (!matchesKeyword) {
        grandparent.classList.add("hidden")
      }
      else {
        if (!matchesSalary) {
          grandparent.classList.add("hidden")
        }
        else {
          grandparent.classList.remove("hidden")
        }
      }
    });
  }
  