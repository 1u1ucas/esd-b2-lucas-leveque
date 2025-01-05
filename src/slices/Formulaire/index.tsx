"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ClientForm from "./ClientForm/Clientform";
import { useEffect, useState } from "react";
import { Client } from "./utils/types/client";
import { getClients } from "./utils/airtable";

/**
 * Props for `Formulaire`.
 */
export type FormulaireProps = SliceComponentProps<Content.FormulaireSlice>;

/**
 * Component for "Formulaire" Slices.
 */
const Formulaire = ({ slice }: FormulaireProps): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getClients(setClients);
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ClientForm setClients={setClients} />
    </section>
  );
};

export default Formulaire;
