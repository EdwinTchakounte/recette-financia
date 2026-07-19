"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RECETTE,
  PROFIL_LABEL,
  PROFIL_ORDER,
  PLATEFORME_LABEL,
  COMPTES,
  MOT_DE_PASSE_DEMO,
  CONSIGNES,
  type Plateforme,
  type Profil,
  type Statut,
} from "@/lib/recette";
import styles from "@/app/page.module.css";

const STORAGE_KEY = "recette-financia:v3";
const THEME_KEY = "recette-financia:theme";

type Mark = { statut: Statut; commentaire?: string };
type Marks = Record<string, Mark>;

export default function RecetteApp() {
  const [plateforme, setPlateforme] = useState<Plateforme>("web");
  const [profil, setProfil] = useState<Profil | "all">("all");
  const [marks, setMarks] = useState<Marks>({});
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showRecap, setShowRecap] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMarks(JSON.parse(raw));
      const t = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
      if (t) {
        setTheme(t);
        document.documentElement.setAttribute("data-theme", t);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
    } catch {
      /* ignore */
    }
  }, [marks, hydrated]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const sections = RECETTE[plateforme];

  const statutOf = (id: string): Statut => marks[id]?.statut ?? "a_tester";

  function setStatut(id: string, statut: Statut) {
    setMarks((m) => {
      const current = m[id]?.statut ?? "a_tester";
      // Re-cliquer sur le meme bouton remet a "a tester".
      const next: Statut = current === statut ? "a_tester" : statut;
      return { ...m, [id]: { ...m[id], statut: next } };
    });
  }

  function setCommentaire(id: string, commentaire: string) {
    setMarks((m) => ({
      ...m,
      [id]: { statut: m[id]?.statut ?? "probleme", commentaire },
    }));
  }

  const countByProfil = useMemo(() => {
    const c: Record<string, number> = {
      all: sections.reduce((n, s) => n + s.cas.length, 0),
    };
    for (const p of PROFIL_ORDER) {
      c[p] = sections
        .filter((s) => s.profil === p)
        .reduce((n, s) => n + s.cas.length, 0);
    }
    return c;
  }, [sections]);

  const visibleSections = useMemo(
    () =>
      sections.filter((s) => profil === "all" || s.profil === profil),
    [sections, profil]
  );

  // Avancement dans le perimetre affiche.
  const scope = useMemo(
    () => visibleSections.flatMap((s) => s.cas.map((c) => c.id)),
    [visibleSections]
  );
  const nbOk = scope.filter((id) => statutOf(id) === "ok").length;
  const nbKo = scope.filter((id) => statutOf(id) === "probleme").length;
  const nbReste = scope.length - nbOk - nbKo;

  // Tous les problemes signales sur la plateforme courante (recap).
  const problemes = useMemo(() => {
    const out: { profil: Profil; titre: string; commentaire: string }[] = [];
    for (const s of sections) {
      for (const c of s.cas) {
        if (statutOf(c.id) === "probleme") {
          out.push({
            profil: s.profil,
            titre: c.titre,
            commentaire: marks[c.id]?.commentaire?.trim() || "",
          });
        }
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, marks]);

  function copierRecap() {
    const lignes = [
      `Problemes - ${PLATEFORME_LABEL[plateforme]}`,
      "",
      ...problemes.map(
        (p) =>
          `- [${PROFIL_LABEL[p.profil]}] ${p.titre} : ${
            p.commentaire || "(sans precision)"
          }`
      ),
    ];
    const texte = lignes.join("\n");
    try {
      navigator.clipboard?.writeText(texte);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const STATUT_TXT: Record<Statut, string> = {
    ok: "OK",
    probleme: "Probleme",
    a_tester: "A tester",
  };

  function dateStamp() {
    return new Date().toISOString().slice(0, 10);
  }
  function dateAffichee() {
    const n = new Date();
    return (
      n.toLocaleDateString("fr-FR") +
      " a " +
      n.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    );
  }

  // Construit le recap de TOUTE la plateforme courante (independamment du filtre).
  function buildRecap() {
    const lignes: {
      profil: Profil;
      profilLabel: string;
      section: string;
      titre: string;
      statut: Statut;
      commentaire: string;
    }[] = [];
    let ok = 0;
    let ko = 0;
    for (const s of sections)
      for (const c of s.cas) {
        const st = statutOf(c.id);
        if (st === "ok") ok++;
        else if (st === "probleme") ko++;
        lignes.push({
          profil: s.profil,
          profilLabel: PROFIL_LABEL[s.profil],
          section: s.titre,
          titre: c.titre,
          statut: st,
          commentaire:
            st === "probleme" ? marks[c.id]?.commentaire?.trim() || "" : "",
        });
      }
    return { lignes, ok, ko, reste: lignes.length - ok - ko, total: lignes.length };
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function telechargerCsv() {
    const { lignes } = buildRecap();
    const esc = (v: string) =>
      /[";\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    const rows = [
      ["Profil", "Section", "Test", "Statut", "Commentaire"].join(";"),
      ...lignes.map((l) =>
        [
          l.profilLabel,
          l.section,
          l.titre,
          STATUT_TXT[l.statut],
          l.commentaire,
        ]
          .map((v) => esc(v))
          .join(";")
      ),
    ];
    // BOM pour un affichage correct des accents dans Excel.
    const blob = new Blob(["﻿" + rows.join("\r\n")], {
      type: "text/csv;charset=utf-8",
    });
    downloadBlob(blob, `recette-financia-${plateforme}-${dateStamp()}.csv`);
  }

  async function telechargerPdf() {
    const { default: JsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const { lignes, ok, ko, reste, total } = buildRecap();

    const doc = new JsPDF({ unit: "pt", format: "a4" });
    const brand: [number, number, number] = [0, 40, 100];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...brand);
    doc.text(`Recette Financia — ${PLATEFORME_LABEL[plateforme]}`, 40, 46);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text(`Date : ${dateAffichee()}`, 40, 64);
    doc.text(
      `Resultat : ${ok} OK  /  ${ko} probleme(s)  /  ${reste} a tester  (sur ${total})`,
      40,
      79
    );

    autoTable(doc, {
      startY: 96,
      head: [["Profil", "Test", "Statut", "Commentaire"]],
      body: lignes.map((l) => [
        l.profilLabel,
        l.titre,
        STATUT_TXT[l.statut],
        l.commentaire,
      ]),
      styles: { fontSize: 9, cellPadding: 5, valign: "top" },
      headStyles: { fillColor: brand, textColor: 255, fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 175 },
        2: { cellWidth: 65 },
        3: { cellWidth: "auto" },
      },
      didParseCell: (data) => {
        if (data.section === "body" && data.column.index === 2) {
          const st = lignes[data.row.index].statut;
          if (st === "ok") data.cell.styles.textColor = [31, 120, 90];
          else if (st === "probleme") {
            data.cell.styles.textColor = [180, 40, 40];
            data.cell.styles.fontStyle = "bold";
          } else data.cell.styles.textColor = [130, 130, 130];
        }
      },
    });

    doc.save(`recette-financia-${plateforme}-${dateStamp()}.pdf`);
  }

  function reinitialiser() {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "Remettre tous les tests de cette plateforme a l'etat 'a tester' ?"
      )
    )
      return;
    setMarks((m) => {
      const next = { ...m };
      for (const s of sections) for (const c of s.cas) delete next[c.id];
      return next;
    });
  }

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>F</span>
            </div>
            <div className={styles.brandText}>
              <b>Financia</b>
              <small>Tests a realiser</small>
            </div>
          </div>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === "dark" ? "Theme clair" : "Theme sombre"}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Tests a realiser</h1>
          <p>{CONSIGNES}</p>
        </div>

        <details className={styles.dataset}>
          <summary className={styles.datasetSummary}>
            Comptes pour se connecter
            <span className={styles.datasetPwd}>
              mot de passe : {MOT_DE_PASSE_DEMO}
            </span>
          </summary>
          <div className={styles.datasetBody}>
            <table className={styles.comptesTable}>
              <thead>
                <tr>
                  <th>Identifiant</th>
                  <th>Role</th>
                  <th>A quoi il sert</th>
                </tr>
              </thead>
              <tbody>
                {COMPTES.map((c) => (
                  <tr key={c.email}>
                    <td className={styles.compteEmail}>{c.email}</td>
                    <td>
                      <span className={styles.profilTag}>
                        {PROFIL_LABEL[c.role]}
                      </span>
                    </td>
                    <td className={styles.comptePerim}>{c.pour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <div className={styles.platformTabs}>
          {(Object.keys(PLATEFORME_LABEL) as Plateforme[]).map((p) => (
            <button
              key={p}
              className={`${styles.platformTab} ${
                plateforme === p ? styles.platformTabActive : ""
              }`}
              onClick={() => setPlateforme(p)}
            >
              {PLATEFORME_LABEL[p]}
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <button
              className={`${styles.chip} ${
                profil === "all" ? styles.chipActive : ""
              }`}
              onClick={() => setProfil("all")}
            >
              Tous
              <span className={styles.chipCount}>{countByProfil.all}</span>
            </button>
            {PROFIL_ORDER.map((p) => (
              <button
                key={p}
                className={`${styles.chip} ${
                  profil === p ? styles.chipActive : ""
                }`}
                onClick={() => setProfil(p)}
              >
                {PROFIL_LABEL[p]}
                <span className={styles.chipCount}>{countByProfil[p]}</span>
              </button>
            ))}
          </div>
          <button className={styles.resetBtn} onClick={reinitialiser}>
            Tout remettre a zero
          </button>
        </div>

        <div className={styles.tally}>
          <span className={styles.tallyItem}>
            <b>{nbReste}</b> a tester
          </span>
          <span className={`${styles.tallyItem} ${styles.tallyOk}`}>
            <b>{nbOk}</b> OK
          </span>
          <span className={`${styles.tallyItem} ${styles.tallyKo}`}>
            <b>{nbKo}</b> probleme{nbKo > 1 ? "s" : ""}
          </span>
          <div className={styles.tallyActions}>
            {problemes.length > 0 && (
              <button
                className={styles.recapBtn}
                onClick={() => setShowRecap((v) => !v)}
              >
                {showRecap ? "Masquer" : "Voir"} les problemes ({problemes.length})
              </button>
            )}
            <span className={styles.dlLabel}>Telecharger :</span>
            <button className={styles.dlBtn} onClick={telechargerPdf}>
              PDF
            </button>
            <button className={styles.dlBtn} onClick={telechargerCsv}>
              CSV
            </button>
          </div>
        </div>

        {showRecap && problemes.length > 0 && (
          <section className={styles.recap}>
            <div className={styles.recapHead}>
              <h2>Problemes signales — {PLATEFORME_LABEL[plateforme]}</h2>
              <button className={styles.copyBtn} onClick={copierRecap}>
                {copied ? "Copie !" : "Copier la liste"}
              </button>
            </div>
            <ul className={styles.recapList}>
              {problemes.map((p, i) => (
                <li key={i}>
                  <span className={styles.recapProfil}>
                    {PROFIL_LABEL[p.profil]}
                  </span>
                  <b>{p.titre}</b>
                  <span className={styles.recapComment}>
                    {p.commentaire || "(sans precision)"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {visibleSections.map((section) => (
          <section key={section.profil} className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionProfil}>
                {PROFIL_LABEL[section.profil]}
              </span>
              <h2>{section.titre}</h2>
            </div>
            <div className={styles.grid}>
              {section.cas.map((c) => {
                const st = statutOf(c.id);
                return (
                  <article
                    key={c.id}
                    className={`${styles.card} ${
                      st === "ok"
                        ? styles.cardOk
                        : st === "probleme"
                        ? styles.cardKo
                        : ""
                    }`}
                  >
                    <h3 className={styles.cardTitle}>{c.titre}</h3>

                    <div className={styles.block}>
                      <span className={styles.blockLabel}>A faire</span>
                      <ol className={styles.etapes}>
                        {c.aFaire.map((e, k) => (
                          <li key={k}>{e}</li>
                        ))}
                      </ol>
                    </div>

                    <div className={styles.block}>
                      <span className={styles.blockLabel}>
                        Ce qui doit se passer
                      </span>
                      <p className={styles.attendu}>{c.attendu}</p>
                    </div>

                    <div className={styles.actions}>
                      <button
                        className={`${styles.mark} ${
                          st === "ok" ? styles.markOkOn : ""
                        }`}
                        onClick={() => setStatut(c.id, "ok")}
                        aria-pressed={st === "ok"}
                      >
                        OK
                      </button>
                      <button
                        className={`${styles.mark} ${
                          st === "probleme" ? styles.markKoOn : ""
                        }`}
                        onClick={() => setStatut(c.id, "probleme")}
                        aria-pressed={st === "probleme"}
                      >
                        Probleme
                      </button>
                      {st !== "a_tester" && (
                        <span className={styles.markState}>
                          {st === "ok" ? "Teste : OK" : "A corriger"}
                        </span>
                      )}
                    </div>

                    {st === "probleme" && (
                      <textarea
                        className={styles.comment}
                        placeholder="Qu'est-ce qui ne va pas ? (une phrase suffit)"
                        value={marks[c.id]?.commentaire ?? ""}
                        onChange={(e) => setCommentaire(c.id, e.target.value)}
                        rows={2}
                      />
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <footer className={styles.footer}>
        Financia — plan de recette. Coche chaque test au fur et a mesure ; ton
        avancement reste enregistre sur cet appareil.
      </footer>
    </div>
  );
}
