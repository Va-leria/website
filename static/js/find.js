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
      const title = vacancy.getAttribute('vacancies__content-cart').toLowerCase();
      const salary = parseFloat(vacancy.getAttribute('vacancies__details-details'));
  
      let matchesKeyword = !keyWord || title.includes(keyWord);
      let matchesSalary = (!salaryFrom || salary >= salaryFrom) && (!salaryTo || salary <= salaryTo);
  
      return matchesKeyword && matchesSalary;
    });
  
    // Удаляем все вакансии
    const vacanciesList = document.querySelector('.vacancies__cart-title');
    vacanciesList.innerHTML = '';
  
    // Добавляем сначала найденные совпадения
    filteredVacancies.forEach(vacancy => {
      vacanciesList.appendChild(vacancy);
    });
  
    // Добавляем остальные вакансии
    vacancies.forEach(vacancy => {
      if (!filteredVacancies.includes(vacancy)) {
        vacanciesList.appendChild(vacancy);
      }
    });
  }
  