export class Category {
  id: number = 0;
  entitiesId: number = 0;
  isRecursive: number = 0;
  itilcategoriesId: number = 0;
  name: string = '';
  completeName: string = '';
  comment: string = '';
  level: number  = 0;
  children: Category[] = [];

  static getJson(obj: any) {
    let category: Category = new Category();
    //let obj = obj_base as Category;

    category.id = obj.id ? obj.id : null;
    category.entitiesId = obj.entities_id ? obj.entities_id : null;
    category.isRecursive = obj.is_recursive ? obj.is_recursive : null;
    category.itilcategoriesId = obj.itilcategories_id
      ? obj.itilcategories_id
      : null;
    category.name = obj.name ? obj.name : null;
    category.completeName = obj.completename ? obj.completename : null;
    category.comment = obj.comment ? obj.comment : null;
    category.level = obj.level ? obj.level : null;
    if (obj["children"] && obj["children"].length > 0) {
      obj["children"].forEach((element: any) => {
        category.children.push(element);
      });
    }

    return category;
  }
}
