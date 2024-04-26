import EditorPickCard from "./EditorPickCard";

function EditorPick() {
  return (
    <div>
      <div className="space-y-10">
        <div>
          <p>Chosen by the editor</p>
          <h1 className="text-lg md:text-xl font-bold">Editors Pick</h1>
        </div>
        <EditorPickCard />
      </div>
    </div>
  );
}

export default EditorPick;
