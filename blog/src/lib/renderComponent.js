import dynamic from "next/dynamic";
import SinglePost from "@/src/templates/single-post";
import SinglePage from "@/src/templates/single-page";
import CategoryPage from "@/src/templates/category-page";
import taxonomy from "@/content/settings/taxonomy.json"; // Import taxonomy

const componentMap = {
  posts: SinglePost,
  pages: SinglePage,
  // Adicione outras pastas fixas aqui, se necessário
};

Object.keys(taxonomy).forEach((key) => {
  if (!componentMap[key]) {
    componentMap[key] = dynamic(() => import(`@/src/templates/${key}-page`)); // Importa dinamicamente os componentes personalizados
  }
});

export function renderComponent(mdFile) {
  console.log("mdFileeeeeeeee:", mdFile);

  if (mdFile.isCategory) {
    console.log("category-page:::");
    console.log("@/src/templates/category-page");
    return <CategoryPage posts={mdFile.posts} />;
  }

  const parentFolder = mdFile?.parentFolder;
  const Component =
    componentMap[parentFolder] ||
    dynamic(() => import(`@/src/templates/custom-page`));

  console.log(parentFolder + "-page:::");
  console.log("@/src/templates/" + parentFolder);

  return <Component post={mdFile} />;
}

export function getComponentByFolder(folder) {
  console.log(folderKey + "-page:::");
  console.log("@/src/templates/" + folderKey);

  const folderKey = Object.keys(taxonomy).find(
    (key) => taxonomy[key] === folder
  );
  return (
    componentMap[folderKey] ||
    dynamic(() => import(`@/src/templates/custom-page`))
  );
}
