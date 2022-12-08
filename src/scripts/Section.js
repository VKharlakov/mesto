class Section {
    constructor({items, renderer}, containerSelector) {
        this.items = items
        this.renderer = renderer
        this.containerSelector = containerSelector
    }

    render() {

    }

    addItem(element) {
        this.containerSelector.append(element)
    }
}