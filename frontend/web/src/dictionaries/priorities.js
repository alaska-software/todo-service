const attributes = [
    {id: "A+", color: "danger"},
    {id: "AA", color: "danger"},
    {id: "BB", color: "success"},
    {id: "CC", color: ""},
    {id: "C-", color: ""},
    {id: "UN", color: "warning"}
]

export function getAttributesById(id) {
    const attributeSet = attributes.find(x => x.id === id);
    return attributeSet ? attributeSet : attributes.find(x => x.id === "UN");
}
