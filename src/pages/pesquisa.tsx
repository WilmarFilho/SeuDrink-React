import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './style.css';
import './assets/bg.webp';
import drinkimg from './assets/drink.webp'
import api from "../services/api";

export default function Pesquisa() {

    interface DrinkIngredientes {
        id: string,
        nome: string,
        created_at: string,
        updated_at: string
    }

    interface DrinkNomes {
        id: string,
        nome: string,
    }

    interface OptionsSelecteds {
        id: string,
        nome: string,
    }

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            if (location.pathname === '/pesquisa') {
                header.style.backgroundColor = '#000000bf';
            }
        }

    }, [location]);

    const [optionsSelecteds, setOptionsSelecteds] = useState<OptionsSelecteds[]>([]);
    const [options, setOptions] = useState<DrinkIngredientes[]>([]);
    const [optionsNome, setOptionsNome] = useState<DrinkNomes[]>([]);
    const [parametro, setParametro] = useState<string>('');
    const [parametroNomes, setParametroNomes] = useState<string>('');
    const [placeholderPesquisa, setPlaceholderPesquisa] = useState<string>('Digite o nome da sua Fruta');


    function buscaPorNome(option: string | null) {
        navigate("/resultado", { state: option });
    };

    useEffect(() => {
        setOptions([]);
        setParametro('');

        if (optionsSelecteds.length == 3) {
            navigate("/resultado", { state: { optionsSelecteds } });
        }


    }, [optionsSelecteds]);

    useEffect(() => {

        if (optionsSelecteds.length == 0) {
            api.get('api/frutas', {
                params: {
                    nome: parametro ? parametro : '***'
                },
            })
                .then((response) => setOptions(response.data))
                .catch(() => console.log('Erro ao buscar frutas'));

            setPlaceholderPesquisa('Digite o nome da sua Fruta');
        }

        if (optionsSelecteds.length == 1) {
            api.get('api/bebidas', {
                params: {
                    nome: parametro ? parametro : '***'
                },
            })
                .then((response) => setOptions(response.data))
                .catch(() => console.log('Erro ao buscar bebidas'));

            setPlaceholderPesquisa('Digite o nome da sua bebida');
        }

        if (optionsSelecteds.length == 2) {
            api.get('api/ingredientes', {
                params: {
                    nome: parametro ? parametro : '***'
                },
            })
                .then((response) => setOptions(response.data))
                .catch(() => console.log('Erro ao buscar ingredientes'));

            setPlaceholderPesquisa('Digite o nome de algum ingrediente');
        }
    }, [parametro]);

    useEffect(() => {
        api.get('api/drink/nome', {
            params: {
                nome: parametroNomes ? parametroNomes : '***'
            },
        })
            .then((response) => setOptionsNome(response.data))
            .catch(() => console.log('Erro ao buscar drinks'));
    }, [parametroNomes]);





    return (<>
        <section className='row' id='hero'>
            <div className='col-12 col-md-9 col-lg-6 content-Hero'>
                <h2>Digite seu ingrediente e aperte no escolhido: </h2>
                <div className='content-options-selected'>
                    <h4>Anteriormente Selecionado :</h4>
                    <div className='optionsSelecteds'>
                        {optionsSelecteds.map((optionSelec, index) => (
                            <div className='optionSelected' key={index}>{optionSelec.nome}</div>
                        ))}
                    </div>
                </div>
                <input type='text' className='campoBusca' placeholder={placeholderPesquisa} value={parametro} onChange={(event) => setParametro(event.target.value)} ></input>
                <div className='optionsHero'>
                    {options.slice(0, 4).map(option => (
                        <div onClick={(event) => {
                            const nome = event.currentTarget.textContent;
                            const id = event.currentTarget.id;
                            setOptionsSelecteds(prevOptions => [...prevOptions, { id, nome: nome ?? '' }]);
                        }} id={option.id} className='option col-5 col-md-3 col-lg-3' key={option.id}>{option.nome}</div>
                    ))}
                </div>
            </div>
            <div className='col-12 col-md-9 col-lg-6'>

            </div>
        </section>
        <section className='row' id='porNome'>
            <div className='col-12 col-md-12 col-lg-6 content-Drink'>
                <img alt='Imagem ilustrativa de um drink' src={drinkimg} />
            </div>
            <div className='col-12  col-md-9 col-lg-6 content-porNome'>
                <h2 style={{ textAlign: 'right' }}>Digite o nome do Drink e aperte no escolhido: </h2>
                <input type='text' className='campoBusca' placeholder='Digite o nome do drink' value={parametroNomes} onChange={(event) => setParametroNomes(event.target.value)} ></input>
                <div className='optionsNome'>
                    {optionsNome.slice(0, 2).map(option => (
                        <div onClick={(event) => {
                            const nome = event.currentTarget.textContent;
                            buscaPorNome(nome);
                        }} id={option.id} className='option col-9 col-md-5 col-lg-5' key={option.id}>{option.nome}</div>
                    ))}
                </div>
            </div>
        </section>

    </>
    );
}