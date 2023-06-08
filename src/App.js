import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, useEnvironment } from '@react-three/drei';
import Ground from './Components/Ground';
import Table from './Components/Table';
import Legs from './Components/Legs';
import TableEditor from './Components/TableEditor';
import './styles.css';

const Init = () => {
  const envMap = useEnvironment({ files: process.env.PUBLIC_URL + "/hdri/satara_night_4k.hdr" })
  return (
    <>
      <Environment map={envMap} background />
      <OrbitControls maxPolarAngle={1.45} autoRotate autoRotateSpeed={-2} />
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

const App = () => {
  const [data, setData] = useState({
    "tableTop": {
      "length": 1,
      "width": 1,
      "height": 1,
      "color": "#ff0000",
    },
    "legs": {
      "style": "square",
      "size": 1,
      "height": 1,
      "color": "#00ff00",
    }
  })

  const tableTopRef = useRef()
  const legsRef = useRef()


  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Init />
        <Table data={data} tableTopRef={tableTopRef} />
        <Legs data={data} legsRef={legsRef} style={data.legs.style} />
        <Ground />
      </Canvas>
      <TableEditor data={data} setData={setData} tableTopRef={tableTopRef} legsRef={legsRef} />
    </Suspense>
  )
}

export default App;