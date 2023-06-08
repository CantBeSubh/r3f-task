import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import './styles.css';
import { Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useEnvironment } from '@react-three/drei';
import { RepeatWrapping, TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';

const Init = ({ cameraRef }) => {
  const envMap = useEnvironment({ files: process.env.PUBLIC_URL + "/hdri/satara_night_4k.hdr" })
  return (
    <>
      <Environment map={envMap} background />
      <OrbitControls maxPolarAngle={1.45} autoRotate autoRotateSpeed={-3} />
      <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />
      {/* <color attach="background" args={["#171720"]} /> */}
      <fog attach="fog" args={["#171720", 10, 50]} />
      <spotLight
        castShadow
        intensity={1.5}
        angle={Math.PI / 8}
        position={[5, 5, 0]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        penumbra={0.5}

      />
      <spotLight
        castShadow
        intensity={1.5}
        angle={Math.PI / 8}
        position={[-5, 5, 0]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        penumbra={0.5}

      />
    </>
  )
}

const Ground = () => {
  const [roughness, normal] = useLoader(TextureLoader,
    [
      process.env.PUBLIC_URL + "/textures/roughness.jpg",
      process.env.PUBLIC_URL + "/textures/normal.jpg"
    ]
  )
  useEffect(() => {
    roughness.wrapS = roughness.wrapT = RepeatWrapping
    normal.wrapS = normal.wrapT = RepeatWrapping
    normal.repeat.set(5, 5)
    roughness.repeat.set(5, 5)
    // normal.encoding = LinearEncoding
  }, [roughness, normal])


  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        color={"#171720"}
        envMapIntensity={0}
        dithering={true}
        roughness={0.7}
        metalness={0.1}
        blur={[1000, 400]}
        mixBlur={40}
        mixStrength={40}
        resolution={1024}
        mirror={0}
        depthScale={0.2}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        debug={0}
        // reflectorOffset={0.1}
        normalMap={normal}
        roughnessMap={roughness}
      />
    </mesh>
  )
}
const Table = ({ tableTopRef }) => {

  return (
    <>

      <ambientLight intensity={0.5} />
      <mesh ref={tableTopRef} onUpdate={() => console.log("UPDATED")}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color={"#ff0000"} />
      </mesh>
    </>
  )
}

const Legs = ({ legsRef, style }) => {

  if (style == "square") {
    return (
      <mesh ref={legsRef}>
        <mesh position={[.9, -0.5, 0.4]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color={"#00ff00"} />
        </mesh>
        <mesh position={[.9, -0.5, -0.4]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color={"#00ff00"} />
        </mesh>
        <mesh position={[-.9, -0.5, 0.4]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color={"#00ff00"} />
        </mesh>
        <mesh position={[-.9, -0.5, -0.4]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color={"#00ff00"} />
        </mesh>
      </mesh>
    )
  }
  return (
    <mesh ref={legsRef}>
      <mesh position={[.9, -0.5, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color={"#00ff00"} />
      </mesh>
      <mesh position={[.9, -0.5, -0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color={"#00ff00"} />
      </mesh>
      <mesh position={[-.9, -0.5, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color={"#00ff00"} />
      </mesh>
      <mesh position={[-.9, -0.5, -0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color={"#00ff00"} />
      </mesh>
    </mesh>
  )
}

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
              // legsRef.current.position.x = e.target.value / 2 - 0.1
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
          {/* <input type="number" id="table-color" /> */}
          {/* <GithubPicker
            color={data.tableTop.color}
            onChangeComplete={color => setData({ ...data, tableTop: { ...data.tableTop, color: color.hex } })}
          /> */}
          <input type="color" id="table-color" value={data.tableTop.color}
            onChange={e => {
              setData({ ...data, tableTop: { ...data.tableTop, color: e.target.value } })
              tableTopRef.current.material.color.set(e.target.value)
            }}
          />
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
              console.log(legsRef.current.children)
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

const App = () => {
  const [data, setData] = useState({
    "tableTop": {
      "length": 1,
      "width": 1,
      "height": 1,
      "color": "#ff0000",
      "textureRepeatX": 1,
      "textureRepeatY": 1
    },
    "legs": {
      "style": "square",
      "size": 1,
      "height": 1,
      "color": "#00ff00",
      "textureRepeatX": 1,
      "textureRepeatY": 1
    }
  })

  const cameraRef = useRef()
  const tableTopRef = useRef()
  const legsRef = useRef()




  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Init cameraRef={cameraRef} />
        <Table data={data} tableTopRef={tableTopRef} />
        <Legs data={data} legsRef={legsRef} style={data.legs.style} />
        <Ground />
      </Canvas>
      <TableEditor data={data} setData={setData} tableTopRef={tableTopRef} legsRef={legsRef} />
    </Suspense>
  )
}

export default App;