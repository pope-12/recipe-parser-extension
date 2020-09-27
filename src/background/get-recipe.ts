import { JsonLd } from '../scraper/json-ld';
import { Recipe } from '../recipe/recipe';

start();

function start() {
  try {
    const recipe: Recipe = new JsonLd().outputRecipe();
    chrome.runtime.sendMessage({type: 'recipeData', recipe: recipe});
  } catch(e) {
    console.error(e);
    alert('Could not get recipe. Make sure you are on a supported recipe website and that the recipe has loaded before clicking')
  }
}
