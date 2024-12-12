import EditorPickCard from "./EditorPickCard";

function EditorPick() {
  return (
    <div>
      <div className="space-y-7">
        <div>
          <p>Chosen by the editor</p>
          <p className="text-lg md:text-xl font-bold">Editors Pick</p>
        </div>
        <EditorPickCard />
      </div>
    </div>
  );
}

export default EditorPick;
