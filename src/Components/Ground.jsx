import { useLoader } from '@react-three/fiber'
import { RepeatWrapping, TextureLoader } from 'three';
import { useEffect } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei';

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
    }, [roughness, normal])


    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[10, 10]} />
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

export default Ground;