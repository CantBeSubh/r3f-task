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

export default Legs;