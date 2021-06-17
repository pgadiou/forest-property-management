--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0 (Debian 12.0-1.pgdg100+1)
-- Dumped by pg_dump version 12.0 (Debian 12.0-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    id integer NOT NULL,
    name text,
    address_city text,
    address_line_1 text,
    number_of_buildings integer,
    status text
);


--
-- Name: building_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.building_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: building_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.building_id_seq OWNED BY public.properties.id;


--
-- Name: buildings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.buildings (
    id integer NOT NULL,
    name text,
    address_line_1 text,
    number integer,
    central_heating boolean,
    property_id integer
);


--
-- Name: building_id_seq1; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.building_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: building_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.building_id_seq1 OWNED BY public.buildings.id;


--
-- Name: lots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lots (
    id integer NOT NULL,
    building_id integer,
    owner_id integer,
    lot_number integer
);


--
-- Name: lot_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lot_id_seq OWNED BY public.lots.id;


--
-- Name: lot_repartition_keys; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lot_repartition_keys (
    id integer NOT NULL,
    quorum bigint,
    lot_id integer,
    repartition_key_id integer
);


--
-- Name: lot_repartition_keys_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lot_repartition_keys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lot_repartition_keys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lot_repartition_keys_id_seq OWNED BY public.lot_repartition_keys.id;


--
-- Name: owners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.owners (
    id integer NOT NULL,
    first_name text,
    last_name text,
    email text
);


--
-- Name: owners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.owners_id_seq OWNED BY public.owners.id;


--
-- Name: repartition_keys; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.repartition_keys (
    id integer NOT NULL,
    name text,
    total bigint,
    property_id integer
);


--
-- Name: repartition_keys_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.repartition_keys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: repartition_keys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.repartition_keys_id_seq OWNED BY public.repartition_keys.id;


--
-- Name: buildings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.buildings ALTER COLUMN id SET DEFAULT nextval('public.building_id_seq1'::regclass);


--
-- Name: lot_repartition_keys id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lot_repartition_keys ALTER COLUMN id SET DEFAULT nextval('public.lot_repartition_keys_id_seq'::regclass);


--
-- Name: lots id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots ALTER COLUMN id SET DEFAULT nextval('public.lot_id_seq'::regclass);


--
-- Name: owners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners ALTER COLUMN id SET DEFAULT nextval('public.owners_id_seq'::regclass);


--
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.building_id_seq'::regclass);


--
-- Name: repartition_keys id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.repartition_keys ALTER COLUMN id SET DEFAULT nextval('public.repartition_keys_id_seq'::regclass);


--
-- Data for Name: buildings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.buildings (id, name, address_line_1, number, central_heating, property_id) FROM stdin;
1	Sevres	80 rue de Sevres	1	t	1
14	Sevres 2	82 rue de Sevres	2	f	1
23	Grand Central 1	89 E 44th Street	1	t	13
\.


--
-- Data for Name: lot_repartition_keys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lot_repartition_keys (id, quorum, lot_id, repartition_key_id) FROM stdin;
1	120	17	1
2	120	1	1
3	12	17	\N
\.


--
-- Data for Name: lots; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lots (id, building_id, owner_id, lot_number) FROM stdin;
1	1	1	1
15	14	28	4
16	1	29	2
17	1	30	3
20	23	32	1
22	\N	30	2
\.


--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.owners (id, first_name, last_name, email) FROM stdin;
1	Pete	Maravich	user@example.com
28	John	Stockton	stock@mail.com
29	Hakeem	Olajuwon	hakeem@mail.com
30	Steve	Nash	nash@mail.com
32	Kyle	Korver	kyle@mail.com
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties (id, name, address_city, address_line_1, number_of_buildings, status) FROM stdin;
1	Laennec	Paris	102 rue de Sevres	2	In registration
13	Grand Central	NYC	89 E 42nd Street	2	In registration
12	Part Dieu	Lyon	5 Place Charles Béraudier	4	In registration
\.


--
-- Data for Name: repartition_keys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.repartition_keys (id, name, total, property_id) FROM stdin;
1	Gardening	12000	1
4	Eclairage exterieur	20000	1
5	test	12	12
6	test 2	1000	12
\.


--
-- Name: building_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.building_id_seq', 14, true);


--
-- Name: building_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.building_id_seq1', 23, true);


--
-- Name: lot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lot_id_seq', 22, true);


--
-- Name: lot_repartition_keys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lot_repartition_keys_id_seq', 4, true);


--
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.owners_id_seq', 33, true);


--
-- Name: repartition_keys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.repartition_keys_id_seq', 6, true);


--
-- Name: properties building_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT building_pkey PRIMARY KEY (id);


--
-- Name: buildings building_pkey1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT building_pkey1 PRIMARY KEY (id);


--
-- Name: lots lot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT lot_pkey PRIMARY KEY (id);


--
-- Name: lot_repartition_keys lot_repartition_keys_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lot_repartition_keys
    ADD CONSTRAINT lot_repartition_keys_pkey PRIMARY KEY (id);


--
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- Name: repartition_keys repartition_keys_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.repartition_keys
    ADD CONSTRAINT repartition_keys_pkey PRIMARY KEY (id);


--
-- Name: buildings building_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT building_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: lots lot_building_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT lot_building_id_fkey FOREIGN KEY (building_id) REFERENCES public.buildings(id);


--
-- Name: lots lot_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT lot_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.owners(id);


--
-- Name: lot_repartition_keys lot_repartition_keys_lot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lot_repartition_keys
    ADD CONSTRAINT lot_repartition_keys_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES public.lots(id);


--
-- Name: lot_repartition_keys lot_repartition_keys_repartition_key_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lot_repartition_keys
    ADD CONSTRAINT lot_repartition_keys_repartition_key_id_fkey FOREIGN KEY (repartition_key_id) REFERENCES public.repartition_keys(id);


--
-- Name: repartition_keys repartition_keys_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.repartition_keys
    ADD CONSTRAINT repartition_keys_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- PostgreSQL database dump complete
--

