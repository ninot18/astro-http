import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;


export const GET: APIRoute = async ( { params, request } ) => {

    const { slug } = params ?? '';


    
    const searchedClient = await db.select().from(Clients).where( eq(Clients.id, Number(slug)) );

    if (searchedClient.length > 0) {

        return new Response(
            JSON.stringify(searchedClient), 
            { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    }

    return new Response(
        JSON.stringify({
            method: 'GET',
            msg: 'Error, id not found',
        }), 
        { 
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
 
};

export const PATCH: APIRoute = async ( { params, request } ) => {
    
    const { slug } = params ?? '';


    try {
        
        const { id, ...body} = await request.json();

        const results = await db.update(Clients).set(body).where( eq(Clients.id, Number(slug)) );
    
        const updatedClient = await db.select().from(Clients).where( eq(Clients.id, Number(slug)) );

        return new Response(
            JSON.stringify(updatedClient), 
            { 
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    } catch (error) {

        return new Response(
            JSON.stringify({
                method: 'POST',
                msg: 'Error, no body found',
            }), 
            { 
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    }
};

export const DELETE: APIRoute = async ( { params, request } ) => {
    
    const { slug } = params ?? '';

    const { rowsAffected } = await db.delete(Clients).where( eq(Clients.id, Number(slug)) );
    
    if (rowsAffected > 0) {
        return new Response(
            JSON.stringify({ 
                method: 'DELETE', 
                msg: `Deleted the id: ${ slug }`,
            }), 
            { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    return new Response(
        JSON.stringify({ 
            method: 'DELETE', 
            msg: `The id: ${ slug } does not exist.`,
        }), 
        { 
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
};