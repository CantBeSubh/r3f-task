const Table = ({ tableTopRef }) => {

    return (
        <>
            <ambientLight intensity={0.5} />
            <mesh ref={tableTopRef} >
                <boxGeometry args={[2, 0.1, 1]} />
                <meshStandardMaterial color={"#ff0000"} />
            </mesh>
        </>
    )
}

export default Table;