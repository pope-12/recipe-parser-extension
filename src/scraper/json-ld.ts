import { Recipe } from '../recipe/recipe';

export class JsonLd {
  private recipeData: any;
  private recipe = new Recipe();

  constructor() {
    return this.getRecipe();
  }

  private formatRecipe(): void {
    this.recipe.ingredients = this.recipeData.recipeIngredient;
    if (typeof this.recipeData.recipeInstructions === 'string') {
      this.recipe.steps = [this.recipeData.recipeInstructions];
    } else if (typeof this.recipeData.recipeInstructions === 'object') {
      this.recipe.steps = this.recipeData.recipeInstructions.map((steps: {text: string}) => steps.text);
    }
    this.recipe.tags = this.recipeData.recipeCategory;
    this.recipe.name = this.recipeData.name;
    this.recipe.originalUrl = window.location.href;
  }

  public outputRecipe(): Recipe {
    if (!this.recipe.name) {
      return;
    }
    console.log('****************************** -- Begin Recipe (copy lines below until stars) -- ******************************');
    console.log(JSON.stringify(this.recipe));
    console.log('****************************** -- End Recipe (copy lines above until stars) -- ******************************');

    return this.recipe;
  }

  private getRecipe(): any {
    const jsonElement = document.querySelector('[type="application/ld+json"]');

    const jsonText = jsonElement.innerHTML;

    let json = JSON.parse(jsonText);
    if (json['@graph']) {
      json = json['@graph'];
    }

    if (!Array.isArray(json)) {
      json = [json];
    }

    this.recipeData = json.find((item: any) => item['@type'] === 'Recipe');

    this.formatRecipe();
  }


}
