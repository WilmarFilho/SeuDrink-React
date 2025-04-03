import { useLocation } from "react-router-dom";
import drinkIcon from './assets/BxDrink.svg'
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

    const BASE_URL = "https://apidrink.celleta.com";

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
    const optionsPesquisaNome = location.state?.option || [];
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

        if (optionsPesquisa.length < 1) {
            const params: any = { nome: optionsPesquisaNome };

            api.get('api/drink/nome', { params })
                .then((response) => setDrinksSelecionados(response.data))
                .catch(() => console.log('Erro ao buscar drinks filtrados'));
        }

    }, [optionsPesquisaNome]);

    useEffect(() => {
        if (optionsPesquisa.length < 1) return; // Evita erro se não houver opções
        const params =
        {
            fruta_id: optionsPesquisa[0]?.id,
            bebida_id: optionsPesquisa[1]?.id
        };

        if (optionsPesquisa[1].nome === 'PULAR') {
            api.get('api/drink', {
                params: {
                    fruta_id: optionsPesquisa[0]?.id
                }
            })
                .then((response) => setDrinksSelecionados(response.data))
                .catch(() => console.log('Erro ao buscar drinks filtrados'));
        } else {
            api.get('api/drink', { params })
                .then((response) => setDrinksSelecionados(response.data))
                .catch(() => console.log('Erro ao buscar drinks filtrados'));
        }


    }, [optionsPesquisa]);

    return (
        <section className="heroDrinks">

            {drinksSelecionados.length > 0 ? (
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1.5}
                    centeredSlides={true}
                    observer={true}
                    observeParents={true}
                    initialSlide={1}
                    scrollbar={{ draggable: true }}

                    style={{
                        height: "auto",
                    }}
                >

                    {drinksSelecionados.map((drink, index) => (
                        <SwiperSlide onClick={() => handleSlideClick(index)} key={drink.id} style={{
                            height: "auto",
                        }}>
                            <div className="cardDrink">
                                <div className="divNomeDrink">
                                    <h2>{drink.nome}</h2>
                                </div>
                                <div style={{ backgroundImage: `url(${BASE_URL}/${drink.foto})` }} className="cardTop">

                                </div>
                                <div className="cardContent">

                                    <div>
                                        
                                        <ul className="listPreparo">
                                            {drink.preparo.split(';').map((etapa, index) => (
                                                etapa.trim() && <li key={index}> <div className="iconDrink" ><img src={drinkIcon}></img> </div>{etapa.trim()}</li>
                                            ))}
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
            )
            }
        </section >
    );

}
