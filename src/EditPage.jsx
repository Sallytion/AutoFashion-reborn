import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import hoodieModel from "./assets/hoodie.glb";
import { CarouselTop } from "./CarouselTop.jsx";
import { CirclePicker } from "react-color";
import * as THREE from "three";
import { MeshPhysicalMaterial } from "three";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import tshirtModel from "./assets/tshirt-base.glb";
import tShirtImage from "./assets/tshirtimagetest.glb";
import hoodieImage from "./assets/hoodie-Image.glb";
import ArrowKeysReact from "arrow-keys-react";
import "./App.css";
import { PopoverDemo } from "@/components/ui/PopoverDemo.jsx";
import { Input } from "@/components/ui/input";
import rotateLeft from "./assets/rotateLeft.png";

const models = [tshirtModel, hoodieModel];

models.forEach((model) => {
    useGLTF.preload(model);
});

function Model({ modelSelect, color, opacity }) {
    const { scene } = useGLTF(models[modelSelect]);

    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new MeshPhysicalMaterial({
                color: color,
                metalness: 0.1,
                roughness: 0.8,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: opacity,
            });
        }
    });

    return <primitive object={scene} />;
}

function ModelImageFront({
    model,
    color,
    textureImage,
    textureOffset,
    cropTop,
    cropBottom,
    cropLeft,
    cropRight,
}) {
    const { scene } = useGLTF(model);
    const texture = new THREE.TextureLoader().load(textureImage);
    texture.center = new THREE.Vector2(0.5, 0.5);

    const { gl: renderer } = useThree();

    useEffect(() => {
        const clipPlane0 = new THREE.Plane(new THREE.Vector3(0, -cropTop, 0), 1);
        const clipPlane1 = new THREE.Plane(new THREE.Vector3(0, cropBottom, 0), 1);
        const clipPlane2 = new THREE.Plane(new THREE.Vector3(cropRight, 0, 0), 2);
        const clipPlane3 = new THREE.Plane(new THREE.Vector3(-cropLeft, 0, 0), 2);

        const helper = new THREE.PlaneHelper(clipPlane0);
        scene.add(helper);

        texture.offset.set(textureOffset[0], textureOffset[1]);
        texture.rotation = Math.PI;
        renderer.localClippingEnabled = true;

        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                    color: color,
                    metalness: 0.1,
                    roughness: 0.8,
                    side: THREE.DoubleSide,
                    map: texture,
                    clippingPlanes: [clipPlane0, clipPlane1, clipPlane2, clipPlane3],
                });
            }
        });
    }, [
        textureOffset,
        renderer,
        cropBottom,
        cropTop,
        cropRight,
        cropLeft,
        textureImage,
    ]);

    return <primitive object={scene} />;
}

const CameraPosition = () => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.z = 50;
    }, [camera]);

    return null;
};

const EditPage = () => {
    const [modelSelect, setModelSelect] = useState(0);
    const [modelColor, setModelColor] = useState("#f44336");
    const [modelOpacity, setModelOpacity] = useState(1);
    const [textureOffset, setTextureOffset] = useState([0, 0]);
    const [editMessage, setEditMessage] = useState("");

    const [cropTop, setCropTop] = useState(10);
    const [cropBottom, setCropBottom] = useState(10);
    const [cropLeft, setCropLeft] = useState(4);
    const [cropRight, setCropRight] = useState(4);
    const [userImage, setUserImage] = useState(null);
    const [textureRotation, setTextureRotation] = useState(0);

    ArrowKeysReact.config({
        left: () => {
            setTextureOffset([textureOffset[0], textureOffset[1] + 0.075]);
        },
        right: () => {
            setTextureOffset([textureOffset[0], textureOffset[1] - 0.075]);
        },
        up: () => {
            setTextureOffset([textureOffset[0] + 0.075, textureOffset[1]]);
        },
        down: () => {
            setTextureOffset([textureOffset[0] - 0.075, textureOffset[1]]);
        },
    });

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUserImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50vw", height: "100vh", overflow: "hidden" }}>
                <Canvas style={{ width: "100%", height: "100%" }}>
                    <CameraPosition />
                    <OrbitControls />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <pointLight position={[-10, -10, -10]} />
                    <directionalLight position={[0, 10, 0]} intensity={1} />
                    <hemisphereLight
                        skyColor={"blue"}
                        groundColor={"brown"}
                        intensity={0.3}
                    />
                    <Model
                        modelSelect={modelSelect}
                        color={modelColor}
                        opacity={modelOpacity}
                    />
                    {userImage && (
                        <ModelImageFront
                            model={modelSelect == 0 ? tShirtImage : hoodieImage}
                            color="#ffffff"
                            textureImage={userImage}
                            textureOffset={textureOffset}
                            cropBottom={cropBottom}
                            cropLeft={cropLeft}
                            cropRight={cropRight}
                            cropTop={cropTop}
                        />
                    )}
                </Canvas>
            </div>
            <div style={{ width: "50vw", height: "100vh", overflow: "hidden" }}>
                <center>
                    <h1>Select Top</h1>
                    <CarouselTop setModelSelect={setModelSelect} />
                    <CirclePicker
                        onChangeComplete={(colorEvent) => setModelColor(colorEvent.hex)}
                    />
                    <br />
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="file" onChange={handleImageUpload} />
                    </div>
                    <br />
                    <br />
                    {/* <div style={{ width: "30vw" }}>
                        <Slider
                            defaultValue={[0]}
                            max={1}
                            step={0.1}
                            onValueChange={(value) => {
                                setModelOpacity(1 - value);
                            }}
                        />
                    </div> */}
                    <br />
                    <div
                        {...ArrowKeysReact.events}
                        onClick={() =>
                            setEditMessage(
                                "Use arrow keys to position, click out to save edit"
                            )
                        }
                        onBlur={() => setEditMessage("")}
                    >
                        <Button variant="outline">Click to Edit Image Position</Button>
                    </div>
                    <div id="editClick">{editMessage}</div>
                    <br />
                    <div
                        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
                    >
                        {/* <button>
                            <img src={rotateLeft} width={"25px"} title="rotate left" />{" "}
                        </button> */}
                        <PopoverDemo
                            setCropBottom={setCropBottom}
                            setCropLeft={setCropLeft}
                            setCropRight={setCropRight}
                            setCropTop={setCropTop}
                        />
                        {/* <button>
                            <img src={rotateLeft} width={"25px"} title="rotate right" />
                        </button> */}
                    </div>
                </center>
            </div>
        </div>
    );
};

export default EditPage;
