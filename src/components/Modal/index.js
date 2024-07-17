import React, { useState, useEffect } from 'react';
import { useVideoContext } from '../../context/';
import axios from 'axios';
import styles from './Modal.module.css';
import close from "./icons8-cancelar-80.png";

const Modal = () => {
    const { isModalOpen, closeModal, selectedVideo, handleSaveVideo } = useVideoContext();
    const initialVideoState = {
        id: '',
        titulo: '',
        categoria: '',
        imagenVideo: '',
        video: '',
        descripcion: ''
    };
    const [editedVideo, setEditedVideo] = useState(initialVideoState);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('https://api-gules-ten-61.vercel.app/videos');
                const uniqueCategorias = [...new Set(response.data.map(video => video.categoria))];
                setCategorias(uniqueCategorias);
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        if (selectedVideo) {
            setEditedVideo(selectedVideo);
        } else {
            setEditedVideo(initialVideoState);
        }
    }, [selectedVideo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await handleSaveVideo(editedVideo); // Llama a la función del contexto para guardar el video editado
            closeModal(); // Cierra el modal después de guardar exitosamente
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    const handleClear = () => {
        setEditedVideo(initialVideoState);
    };

    return (
        isModalOpen && (
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalCerrar}>
                        <button className={styles.buttonClose} onClick={closeModal}>
                            <img src={close} alt='Cerrar' />
                        </button>
                    </div>
                    <form className={styles.formModal}>
                        <h2>EDITAR VIDEO</h2>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="titulo"
                                placeholder="Ingrese el titulo"
                                value={editedVideo.titulo}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Categoría:
                            <select
                                name="categoria"
                                value={editedVideo.categoria}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Seleccione la categoría</option>
                                {categorias.map((cat) => (
                                    <option className={styles.listModal} key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Imagen:
                            <input
                                type="text"
                                name="imagenVideo"
                                placeholder="URL de la imagen"
                                value={editedVideo.imagenVideo}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Video:
                            <input
                                type="text"
                                name="video"
                                placeholder="URL del video"
                                value={editedVideo.video}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Descripción:
                            <textarea
                                name="descripcion"
                                placeholder="¿De qué se trata el video?"
                                value={editedVideo.descripcion}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                    <div className={styles.modalButtons}>
                        <button className={styles.buttonGuardar} onClick={handleSave}>Guardar</button>
                        <button className={styles.buttonLimpiar} onClick={handleClear}>Limpiar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
