--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6
-- Dumped by pg_dump version 10.6

-- Started on 2019-10-02 19:40:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2848 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16555)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    approved boolean,
    spot_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16558)
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.booking_id_seq OWNER TO postgres;

--
-- TOC entry 2849 (class 0 OID 0)
-- Dependencies: 197
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 198 (class 1259 OID 16560)
-- Name: spot_techs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spot_techs (
    id integer NOT NULL,
    spot_id integer NOT NULL,
    tech_id integer NOT NULL
);


ALTER TABLE public.spot_techs OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16563)
-- Name: spot_techs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spot_techs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spot_techs_id_seq OWNER TO postgres;

--
-- TOC entry 2850 (class 0 OID 0)
-- Dependencies: 199
-- Name: spot_techs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spot_techs_id_seq OWNED BY public.spot_techs.id;


--
-- TOC entry 200 (class 1259 OID 16565)
-- Name: spots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spots (
    id integer NOT NULL,
    price double precision,
    user_id integer NOT NULL,
    thumbnail character varying(255) NOT NULL,
    company character varying(100) NOT NULL
);


ALTER TABLE public.spots OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16568)
-- Name: spots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spots_id_seq OWNER TO postgres;

--
-- TOC entry 2851 (class 0 OID 0)
-- Dependencies: 201
-- Name: spots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spots_id_seq OWNED BY public.spots.id;


--
-- TOC entry 202 (class 1259 OID 16570)
-- Name: techs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.techs (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.techs OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16573)
-- Name: techs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.techs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.techs_id_seq OWNER TO postgres;

--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 203
-- Name: techs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.techs_id_seq OWNED BY public.techs.id;


--
-- TOC entry 204 (class 1259 OID 16575)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16578)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 205
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2694 (class 2604 OID 16580)
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- TOC entry 2695 (class 2604 OID 16581)
-- Name: spot_techs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot_techs ALTER COLUMN id SET DEFAULT nextval('public.spot_techs_id_seq'::regclass);


--
-- TOC entry 2696 (class 2604 OID 16582)
-- Name: spots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spots ALTER COLUMN id SET DEFAULT nextval('public.spots_id_seq'::regclass);


--
-- TOC entry 2697 (class 2604 OID 16583)
-- Name: techs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.techs ALTER COLUMN id SET DEFAULT nextval('public.techs_id_seq'::regclass);


--
-- TOC entry 2698 (class 2604 OID 16584)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2700 (class 2606 OID 16586)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 2702 (class 2606 OID 16588)
-- Name: spot_techs spot_techs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot_techs
    ADD CONSTRAINT spot_techs_pkey PRIMARY KEY (id);


--
-- TOC entry 2704 (class 2606 OID 16590)
-- Name: spots spots_company_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_company_key UNIQUE (company);


--
-- TOC entry 2706 (class 2606 OID 16592)
-- Name: spots spots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_pkey PRIMARY KEY (id);


--
-- TOC entry 2708 (class 2606 OID 16594)
-- Name: techs techs_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.techs
    ADD CONSTRAINT techs_name_key UNIQUE (name);


--
-- TOC entry 2710 (class 2606 OID 16596)
-- Name: techs techs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.techs
    ADD CONSTRAINT techs_pkey PRIMARY KEY (id);


--
-- TOC entry 2712 (class 2606 OID 16598)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2714 (class 2606 OID 16600)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2716 (class 2606 OID 16601)
-- Name: bookings bookings_spot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_spot_id_fkey FOREIGN KEY (spot_id) REFERENCES public.spots(id);


--
-- TOC entry 2715 (class 2606 OID 16606)
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2717 (class 2606 OID 16611)
-- Name: spot_techs spot_techs_spot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot_techs
    ADD CONSTRAINT spot_techs_spot_id_fkey FOREIGN KEY (spot_id) REFERENCES public.spots(id);


--
-- TOC entry 2718 (class 2606 OID 16616)
-- Name: spot_techs spot_techs_tech_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spot_techs
    ADD CONSTRAINT spot_techs_tech_id_fkey FOREIGN KEY (tech_id) REFERENCES public.techs(id);


--
-- TOC entry 2719 (class 2606 OID 16621)
-- Name: spots spots_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2019-10-02 19:40:21

--
-- PostgreSQL database dump complete
--

