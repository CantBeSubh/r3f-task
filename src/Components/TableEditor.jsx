const TableEditor = ({ data, setData, legsRef, tableTopRef }) => {
    return (
        <div className="table-editor">

            <h1 className="table-editor__title">TABLE EDITOR</h1>

            {/* ==========TableTop=========== */}
            <h2 className="table-editor__subtitle">TABLE TOP</h2>
            <div className="table-editor__controls">
                <div className="table-editor__control">
                    <label htmlFor="table-length">Length</label>
                    <input type="number" id="table-length"
                        value={data.tableTop.length}
                        onChange={e => {
                            setData({ ...data, tableTop: { ...data.tableTop, length: e.target.value } })
                            tableTopRef.current.scale.x = e.target.value
                        }}
                    />
                </div>
                <div className="table-editor__control">
                    <label htmlFor="table-width">Width</label>
                    <input type="number" id="table-width"
                        value={data.tableTop.width}
                        onChange={e => {
                            setData({ ...data, tableTop: { ...data.tableTop, width: e.target.value } })
                            tableTopRef.current.scale.z = e.target.value
                        }}
                    />
                </div>
                <div className="table-editor__control">
                    <label htmlFor="table-height">Height</label>
                    <input type="number" id="table-height"
                        value={data.tableTop.height}
                        onChange={e => {
                            setData({ ...data, tableTop: { ...data.tableTop, height: e.target.value } })
                            tableTopRef.current.scale.y = e.target.value
                        }}
                    />
                </div>
                <div className="table-editor__control">
                    <label htmlFor="table-color">Color</label>
                    <input type="color" id="table-color" value={data.tableTop.color}
                        onChange={e => {
                            setData({ ...data, tableTop: { ...data.tableTop, color: e.target.value } })
                            tableTopRef.current.material.color.set(e.target.value)
                        }}
                    />
                </div>
                {/* Take texture file as input */}
                <div className="table-editor__control">
                    <label htmlFor="table-texture">Texture</label>
                    {/* <input
                        type="file"
                        id="table-texture"
                        // extensions = ".jpg, .png, .jpeg"
                        accept=".jpg, .png, .jpeg"
                        onChange={e => {
                            const file = e.target.files[0]
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = e => {
                                const texture = e.target.result
                                // giving error
                            }
                        }}
                    /> */}
                </div>

            </div>

            {/* ==========LEGS=========== */}

            <h2 className="table-editor__subtitle">LEGS</h2>
            <div className="table-editor__controls">
                <div className="table-editor__control">
                    <label htmlFor="leg-width">LegStyle</label>
                    <select name="leg-style" id="leg-style"
                        value={data.legs.style}
                        onChange={e => {
                            setData({ ...data, legs: { ...data.legs, style: e.target.value } })
                        }}
                    >
                        <option value="square">Square</option>
                        <option value="round">Round</option>
                    </select>
                </div>
                <div className="table-editor__control">
                    <label htmlFor="leg-height">Height</label>
                    <input type="number" id="leg-height"
                        value={data.legs.height}
                        onChange={e => {
                            setData({ ...data, legs: { ...data.legs, height: e.target.value } })
                            // console.log(legsRef.current)
                            // legsRef.current.scale.z = e.target.value
                            legsRef.current.children.forEach(mesh => {
                                mesh.scale.y = e.target.value
                            }
                            );
                        }}
                    />
                </div>

                <div className="table-editor__control">
                    <label htmlFor="leg-size">Size</label>
                    <input type="number" id="leg-size"
                        value={data.legs.size}
                        onChange={e => {
                            setData({ ...data, legs: { ...data.legs, size: e.target.value } })
                            // legsRef.current.scale.x = e.target.value
                            legsRef.current.children.forEach(mesh => {
                                mesh.scale.x = e.target.value
                                mesh.scale.z = e.target.value
                            }
                            );
                        }}
                    />
                </div>


                <div className="table-editor__control">
                    <label htmlFor="leg-color">Color</label>
                    {/* <input type="number" id="leg-color" /> */}
                    <input type="color" id="leg-color" value={data.legs.color}
                        onChange={e => {
                            setData({ ...data, legs: { ...data.legs, color: e.target.value } })

                            legsRef.current.children.forEach(mesh => {
                                mesh.material.color.set(e.target.value)
                            });
                        }}
                    />
                </div>
            </div>
            <div className="table-editor__controls">
                <div className="table-editor__button">
                    <input type="file" id="table-file" onChange={e => {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onload = e => {
                            const json = JSON.parse(e.target.result)
                            setData(json)
                            tableTopRef.current.scale.x = json.tableTop.length
                            tableTopRef.current.scale.z = json.tableTop.width
                            tableTopRef.current.scale.y = json.tableTop.height
                            tableTopRef.current.material.color.set(json.tableTop.color)
                            legsRef.current.children.forEach(mesh => {
                                mesh.scale.x = json.legs.size
                                mesh.scale.z = json.legs.size
                                mesh.scale.y = json.legs.height
                                mesh.material.color.set(json.legs.color)
                            }
                            );
                        }
                        reader.readAsText(file)
                    }} />
                </div>
                <div className="table-editor__button">
                    <button onClick={() => {
                        const json = JSON.stringify(data)
                        const blob = new Blob([json], { type: "application/json" })
                        const href = URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.download = "table.json"
                        href && (link.href = href)
                        link.click()
                    }}>Download</button>
                </div>

            </div>
        </div>

    )
}

export default TableEditor;