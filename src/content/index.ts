import { Recipe } from '../recipe/recipe';

console.log('in the content file');
chrome.runtime.onMessage.addListener(recievefunc);
function recievefunc(data: {recipe: Recipe, type: 'recipeData'}, sender: any, sendResponse: any){
  const recipe = data.recipe;
  (document.getElementById('name') as HTMLInputElement).value = recipe.name;

  document.querySelectorAll('.btn.btn-primary').forEach((el: HTMLElement) => {
    if (el.textContent === 'Toggle Import') {
      el.click();
    }
  });

  let ingredients = '';
  for (let ingredient of recipe.ingredients) {
    ingredients += ingredient + '\n';
  }
  (document.getElementById('import-ingredients') as HTMLInputElement).value = ingredients;

  let steps = '';
  for (let step of recipe.steps) {
    steps += step + '\n';
  }
  (document.getElementById('import-steps') as HTMLInputElement).value = steps;


}
