import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import './styles.css';
import { MeshReflectorMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { LinearEncoding, RepeatWrapping, TextureLoader } from 'three';


const Init = () => {
  return (
    <>
      <color attach="background" args={["#171720"]} />
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
const Table = () => {
  return (
    <>
      <OrbitControls maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </>
  )
}
const TableEditor = () => {
  return null
}

const App = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Init />
        <Table />
        <Ground />
      </Canvas>
      <TableEditor />
    </Suspense>
  )
}

export default App;