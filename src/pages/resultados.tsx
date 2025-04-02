import { useLocation } from "react-router-dom";
import api from "../services/api";
import './style.css';
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Resultados() {

    interface Drink {
        id: number;
        created_at: string;
        updated_at: string;
        nome: string;
        foto: string;
        preparo: string;
        fruta_id: number;
        bebida_id: number;
        frutas: {
            id: number;
            created_at: string;
            updated_at: string;
            nome: string;
        };
        bebidas: {
            id: number;
            created_at: string;
            updated_at: string;
            nome: string;
        };
        ingredientes: Array<{
            id: number;
            created_at: string;
            updated_at: string;
            nome: string;
            pivot: {
                drink_id: number;
                ingrediente_id: number;
            };
        }>;
    }

    const location = useLocation();



    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            if (location.pathname === '/resultado') {
                header.style.backgroundColor = '#070707';
            }
        }

    }, [location]);


    const optionsPesquisa = location.state?.optionsSelecteds || [];
    const [drinksSelecionados, setDrinksSelecionados] = useState<Drink[]>([]);
    const swiperRef = useRef<any>(null);

    const handleSlideClick = (index: number) => {

        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }

    };

    const navigate = useNavigate();

    const retornaHome = () => {
        navigate("/pesquisa");
    }

    useEffect(() => {
        if (optionsPesquisa.length < 2) return; // Evita erro se opções de pesquisa não estiverem definidas

        api.get('api/drink', {
            params: {
                fruta_id: optionsPesquisa[0]?.id,
                bebida_id: optionsPesquisa[1]?.id
            },
        })
            .then((response) => setDrinksSelecionados(response.data))
            .catch(() => console.log('Erro ao buscar drinks filtrados'));
    }, [optionsPesquisa]);

    return (
        <section className="heroDrinks">

            {drinksSelecionados.length > 0 ? (
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={40}
                    slidesPerView={1.75}
                    centeredSlides={true}
                    initialSlide={1}

                    scrollbar={{ draggable: true }}
                    breakpoints={{
                        120: { slidesPerView: 1.5 },
                        768: { slidesPerView: 1.5 },
                        1024: { slidesPerView: 2.5 },
                        1440: { slidesPerView: 2.5 },
                    }}
                    style={{
                        height: "auto",
                    }}

                >
                    {drinksSelecionados.map((drink, index) => (
                        <SwiperSlide onClick={() => handleSlideClick(index)} key={drink.id} style={{
                            height: "auto",
                        }}>
                            <div className="cardDrink">
                                <div style={{ backgroundImage: `url(${drink.foto})` }} className="cardTop">
                                    <div className="divNomeDrink">
                                        <h2>{drink.nome}</h2>
                                    </div>
                                </div>
                                <div className="cardContent">
                                    <div>
                                        <h3>Ingredientes:</h3>
                                        <ul>
                                            <li>{drink.frutas?.nome}</li>
                                            <li>{drink.bebidas?.nome}</li>
                                            {drink.ingredientes?.map((ingrediente, index) => (
                                                <li key={`${ingrediente.id}-${index}`}>{ingrediente.nome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Modo de Preparo:</h3>
                                        <ul>
                                            <li>{drink.preparo}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="NotDrinks">
                    <p>Nenhum drink encontrado para os filtros selecionados.</p>
                    <button onClick={retornaHome}>Voltar</button>
                </div>
            )}
        </section>
    );

}
