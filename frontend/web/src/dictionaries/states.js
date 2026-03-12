const attributes = [
    {id: "NE", color: "", icon: "pi pi-file"},
    {id: "IP", color: "", icon: "pi pi-truck"},
    {id: "PE", color: "danger", icon: "pi pi-clock"},
    {id: "DO", color: "success", icon: "pi pi-check"},
    {id: "UN", color: "warning", icon: "pi pi-question-circle"}
]

export function getAttributesById(id) {
    const attributeSet = attributes.find(x => x.id === id);
    return attributeSet ? attributeSet : attributes.find(x => x.id === "UN");
}
