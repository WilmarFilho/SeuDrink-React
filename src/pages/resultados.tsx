import { useLocation } from "react-router-dom";
import api from "../services/api";
import './style.css';
import React, { useEffect, useState } from 'react';

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
    const optionsPesquisa = location.state.optionsSelecteds;
    const [drinksSelecionados, setDrinksSelecionados] = useState<Drink[]>([]);

    useEffect(() => {
        // A chamada à API deve acontecer aqui dentro do useEffect
        api.get('api/drink', {
            params: {
                fruta_id: optionsPesquisa[0].id,
                bebida_id: optionsPesquisa[1].id
            },
        })
            .then((response) => setDrinksSelecionados(response.data)) // Atualiza o estado com a resposta
            .catch(() => console.log('Erro ao buscar drinks filtrados'));
    }, [optionsPesquisa]);

    return (
        <section className="heroDrinks">
            {drinksSelecionados.length > 0 ? (
                drinksSelecionados.map((drink) => (
                    <div className="cardDrink" key={drink.id}>
                        <div className="cardTop">
                            <h2>{drink.nome}</h2>
                            <img src='https://drink.celleta.com/imagens/drinks/caipirinhademorango.jpg' alt={drink.nome} />
                        </div>
                        <div className="cardContent">
                            <div>
                                <h3>Ingredientes:</h3>
                                <ul>
                                    <li>{drink.frutas.nome}</li>
                                    <li>{drink.bebidas.nome}</li>
                                    {drink.ingredientes.map((ingrediente) => (
                                        <li>{ingrediente.nome}</li>
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
                ))
            ) : (
                <p>Nenhum drink encontrado para os filtros selecionados.</p>
            )}
        </section>
    );
}
