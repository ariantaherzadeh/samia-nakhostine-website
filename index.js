(function () {
	// Pristine snapshot of the page source, taken before any rendering, used to republish with new listings.
	var PRISTINE = document.body.innerHTML;
	var dataEl = document.getElementById("listings-data");
	var listings = [];
	try {
		listings = JSON.parse(dataEl.textContent) || [];
	} catch (e) {
		listings = [];
	}

	var FR = {
		nav_services: "Services",
		nav_pm: "Gestion immobilière",
		nav_listings: "Inscriptions",
		nav_contact: "Contact",
		nav_team: "Équipe",
		go: "Parler à Samia",
		book_short: "Réserver",
		book_long: "Réserver une consultation gratuite de 30 min",
		see_listings: "Inscriptions actuelles",
		hero_eyebrow: "REALTOR® · Ottawa · Anglais et français",
		book_mid: "Réserver une consultation",
		hb_t: "Votre courtière à Ottawa",
		hb_s: "Achat · Vente · Location · Gestion immobilière",
		hero_lede:
			"Courtière immobilière bilingue (REALTOR®) chez Royal LePage Integrity Realty, travaillant avec l'équipe YourOttawaRealEstate, offrant une représentation dévouée aux acheteurs, vendeurs, propriétaires et locataires partout dans le marché d'Ottawa.",
		cred1: "Acheteurs et vendeurs",
		cred2: "Propriétaires et locataires",
		cred3: "Gestion immobilière",
		svc_eyebrow: "Ce que je fais",
		svc_title: "Services",
		svc_sub:
			"Un accompagnement attentionné à chaque étape de votre vie immobilière.",
		tg_lux: "Achat · Vente",
		tg_buy: "Acheteurs",
		tg_sell: "Vendeurs",
		tg_rent: "Propriétaires · Locataires",
		tg_inv: "Investisseurs",
		pm_more: "Comment fonctionne la gestion →",
		s1t: "Services d'agent d'achat",
		s1d: "Recherche, visites, stratégie d'offre et négociation, jusqu'au jour de la conclusion.",
		s2t: "Premier achat d'un logement",
		s2d: "Un parcours clair, du budget et de la préapprobation jusqu'à la remise des clés.",
		s3t: "Propriétés de luxe",
		s3d: "Une représentation discrète et minutieuse pour l'achat ou la vente de propriétés haut de gamme.",
		s4t: "Locations de propriétés",
		s4d: "Accompagnement des propriétaires et des locataires : prix, visites, demandes et bail.",
		s5t: "Investissement immobilier",
		s5d: "Conseils sur les immeubles à revenus, les loyers attendus et la valeur à long terme dans les quartiers d'Ottawa.",
		s6t: "Services d'agent du vendeur",
		s6d: "Prix, préparation, mise en marché et négociation pour vendre votre propriété en toute confiance.",
		s7t: "Gestion immobilière",
		s7d: "Placement de locataires, perception des loyers, entretien et inspections, on s'en occupe pour vous.",
		tg_pm: "Propriétaires",
		cta_t: "Vous ne savez pas par où commencer?",
		cta_d: "Parlez-moi de vos projets lors d'un appel gratuit de 30 minutes et je vous proposerai les prochaines étapes.",
		svc_aside:
			"Chaque client travaille directement avec moi, appuyé par une équipe de quatre courtiers.",
		pm_eyebrow: "Pour les propriétaires",
		pm_title: "La gestion immobilière, on s'en occupe",
		pm_sub: "Notre équipe offre des services de gestion immobilière aux propriétaires d'Ottawa. De la préparation du logement jusqu'à son occupation, une seule équipe à appeler.",
		pm1: "Recherche de locataires, visites et vérification des demandes",
		pm2: "Perception des loyers et suivi des paiements",
		pm3: "Entretien et réparations, coordonnés avec des entrepreneurs de confiance",
		pm4: "Inspections régulières et communication quotidienne avec les locataires",
		pm_cta: "Parlons de votre propriété",
		ls_eyebrow: "Sur le marché",
		ls_title: "Inscriptions actuelles",
		ls_sub: "Les propriétés à vendre et à louer que je représente en ce moment. Contactez-moi pour plus de détails ou pour une visite.",
		f_all: "Toutes",
		f_sale: "À vendre",
		f_lease: "À louer",
		empty_t: "De nouvelles inscriptions bientôt",
		empty_d:
			"Aucune inscription active pour le moment. Vous voulez acheter, vendre ou louer? Réservez une consultation et je vous enverrai les propriétés correspondantes dès qu'elles seront disponibles.",
		tm_eyebrow: "Équipe YourOttawaRealEstate",
		tm_title: "Quatre courtiers, une équipe",
		tm_sub: "En travaillant avec moi, vous profitez aussi de l'expérience de toute l'équipe YourOttawaRealEstate chez Royal LePage Integrity Realty.",
		r_sylvia: "REALTOR® et adjointe autorisée",
		r_sepehr: "REALTOR® et chef d'équipe",
		ct_eyebrow: "Discutons",
		ct_title: "Des questions ou une propriété vous intéresse?",
		ct_sub: "Contactez-moi directement ou réservez une consultation de 30 minutes au moment qui vous convient.",
		k_email: "Courriel",
		k_phone: "Appel ou texto",
		copy: "Copier",
		copied: "Copié",
		office: "Équipe YourOttawaRealEstate · Royal LePage Integrity Realty, courtage",
		foot: "Samia Nakhostine, REALTOR®, Royal LePage Integrity Realty, courtage. Indépendante et autonome. Ne vise pas à solliciter les acheteurs ou vendeurs déjà sous contrat.",
	};
	var CARD = {
		en: {
			sale: "For sale",
			lease: "For lease",
			active: "Active",
			conditional: "Conditional",
			sold: "Sold",
			leased: "Leased",
			bd: "bd",
			ba: "ba",
			mo: "/mo",
			details: "View details",
			nophoto: "Photo coming soon",
		},
		fr: {
			sale: "À vendre",
			lease: "À louer",
			active: "Active",
			conditional: "Conditionnelle",
			sold: "Vendue",
			leased: "Louée",
			bd: "ch.",
			ba: "sdb",
			mo: "/mois",
			details: "Voir les détails",
			nophoto: "Photo à venir",
		},
	};
	var EN = {};
	document.querySelectorAll("[data-i18n]").forEach(function (el) {
		var k = el.getAttribute("data-i18n");
		if (!(k in EN)) EN[k] = el.textContent;
	});
	var lang = "en";
	try {
		var s = localStorage.getItem("samia-lang");
		if (s === "fr") lang = "fr";
	} catch (e) {}

	function applyLang() {
		var dict = lang === "fr" ? FR : EN;
		document.querySelectorAll("[data-i18n]").forEach(function (el) {
			var k = el.getAttribute("data-i18n");
			if (dict[k]) el.textContent = dict[k];
		});
		document.documentElement.lang = lang;
		document
			.getElementById("lang-en")
			.setAttribute("aria-pressed", lang === "en");
		document
			.getElementById("lang-fr")
			.setAttribute("aria-pressed", lang === "fr");
		render();
	}
	document.getElementById("lang-en").onclick = function () {
		lang = "en";
		try {
			localStorage.setItem("samia-lang", "en");
		} catch (e) {}
		applyLang();
	};
	document.getElementById("lang-fr").onclick = function () {
		lang = "fr";
		try {
			localStorage.setItem("samia-lang", "fr");
		} catch (e) {}
		applyLang();
	};

	var filter = "all";
	document.querySelectorAll(".filters .chip").forEach(function (b) {
		b.onclick = function () {
			filter = b.getAttribute("data-f");
			document.querySelectorAll(".filters .chip").forEach(function (x) {
				x.setAttribute("aria-pressed", x === b);
			});
			render();
		};
	});

	function money(n) {
		var v = Number(String(n).replace(/[^0-9.]/g, ""));
		if (!v) return "";
		return new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
			style: "currency",
			currency: "CAD",
			maximumFractionDigits: 0,
		}).format(v);
	}
	function srcOf(id) {
		return /^(data:|https?:|\/|img\/)/.test(id) ? id : "/_blob/" + id;
	}
	function photosOf(l) {
		return l.photos && l.photos.length
			? l.photos.slice()
			: l.photo
				? [l.photo]
				: [];
	}
	function el(tag, cls, text) {
		var e = document.createElement(tag);
		if (cls) e.className = cls;
		if (text != null) e.textContent = text;
		return e;
	}

	function render() {
		var t = CARD[lang],
			grid = document.getElementById("grid");
		grid.innerHTML = "";
		var shown = listings.filter(function (l) {
			return filter === "all" || l.type === filter;
		});
		document.getElementById("empty").hidden = listings.length > 0;
		document.getElementById("list-bar").hidden = listings.length < 2;
		shown.forEach(function (l) {
			var c = el("article", "card"),
				ph = el("div", "ph");
			var pics = photosOf(l);
			if (pics.length) {
				var tr = el("div", "track");
				tr.tabIndex = 0;
				tr.setAttribute("aria-label", l.address + " photos");
				pics.forEach(function (id, k) {
					var im = el("img");
					im.src = srcOf(id);
					im.alt = l.address + " photo " + (k + 1);
					if (k > 0) im.loading = "lazy";
					tr.appendChild(im);
				});
				ph.appendChild(tr);
				if (pics.length > 1) {
					var cnt = el("span", "gcount", "1 / " + pics.length),
						pv = el("button", "gnav prev", "‹"),
						nx = el("button", "gnav next", "›");
					pv.type = nx.type = "button";
					pv.setAttribute("aria-label", "Previous photo");
					nx.setAttribute("aria-label", "Next photo");
					pv.disabled = true;
					var idx = function () {
						return Math.round(
							tr.scrollLeft / Math.max(1, tr.clientWidth),
						);
					};
					var upd = function () {
						var i = idx();
						cnt.textContent = i + 1 + " / " + pics.length;
						pv.disabled = i <= 0;
						nx.disabled = i >= pics.length - 1;
					};
					tr.addEventListener(
						"scroll",
						function () {
							requestAnimationFrame(upd);
						},
						{ passive: true },
					);
					pv.onclick = function () {
						tr.scrollTo({
							left: (idx() - 1) * tr.clientWidth,
							behavior: "smooth",
						});
					};
					nx.onclick = function () {
						tr.scrollTo({
							left: (idx() + 1) * tr.clientWidth,
							behavior: "smooth",
						});
					};
					ph.appendChild(pv);
					ph.appendChild(nx);
					ph.appendChild(cnt);
				}
			} else ph.appendChild(el("span", null, t.nophoto));
			ph.appendChild(
				el(
					"span",
					"status s-" + l.status,
					l.status === "active" ? t[l.type] : t[l.status],
				),
			);
			c.appendChild(ph);
			var bd = el("div", "bd"),
				pr = el("div", "price", money(l.price));
			if (l.type === "lease" && l.price)
				pr.appendChild(el("small", null, " " + t.mo));
			bd.appendChild(pr);
			bd.appendChild(el("div", "addr", l.address));
			var m = [];
			if (l.city) m.push(l.city);
			if (l.beds) m.push(l.beds + " " + t.bd);
			if (l.baths) m.push(l.baths + " " + t.ba);
			if (m.length) bd.appendChild(el("div", "meta", m.join(" · ")));
			if (/^https?:\/\//.test(l.link || "")) {
				var a = el("a", "more", t.details + " →");
				a.href = l.link;
				a.target = "_blank";
				a.rel = "noopener";
				bd.appendChild(a);
			}
			c.appendChild(bd);
			grid.appendChild(c);
		});
		renderMine();
	}

	// copy buttons
	document.querySelectorAll(".copy").forEach(function (b) {
		b.onclick = function () {
			var txt = b.getAttribute("data-copy");
			var done = function () {
				b.textContent = lang === "fr" ? FR.copied : "Copied";
				setTimeout(function () {
					b.textContent = lang === "fr" ? FR.copy : EN.copy;
				}, 1500);
			};
			try {
				navigator.clipboard.writeText(txt).then(done, function () {
					sel(b.parentNode.querySelector("a"));
				});
			} catch (e) {
				sel(b.parentNode.querySelector("a"));
			}
		};
	});
	function sel(node) {
		try {
			var r = document.createRange();
			r.selectNodeContents(node);
			var s = getSelection();
			s.removeAllRanges();
			s.addRange(r);
		} catch (e) {}
	}

	// ----- Editing (owner / editors only) -----
	var artifactNS = null,
		assetsNS = null,
		editingId = null;
	var $ = function (id) {
		return document.getElementById(id);
	};
	function renderMine() {
		var ul = $("mine");
		if (!ul) return;
		ul.innerHTML = "";
		listings.forEach(function (l) {
			var li = el("li");
			li.appendChild(
				el("span", null, l.address + " · " + (CARD.en[l.status] || "")),
			);
			var box = el("span", "row-actions");
			var e = el("button", "link-btn", "Edit");
			e.type = "button";
			e.onclick = function () {
				startEdit(l.id);
			};
			var d = el("button", "link-btn", "Remove");
			d.type = "button";
			d.onclick = function () {
				if (d.dataset.armed) {
					listings = listings.filter(function (x) {
						return x.id !== l.id;
					});
					save("Removed.");
				} else {
					d.dataset.armed = "1";
					d.textContent = "Confirm remove";
					setTimeout(function () {
						delete d.dataset.armed;
						d.textContent = "Remove";
					}, 4000);
				}
			};
			box.appendChild(e);
			box.appendChild(d);
			li.appendChild(box);
			ul.appendChild(li);
		});
	}
	var editPhotos = [];
	function drawThumbs() {
		var box = $("ed-thumbs");
		box.innerHTML = "";
		editPhotos.forEach(function (id, k) {
			var f = el("figure"),
				im = el("img"),
				x = el("button", null, "×");
			im.src = srcOf(id);
			im.alt = "Photo " + (k + 1);
			x.type = "button";
			x.setAttribute("aria-label", "Remove photo " + (k + 1));
			x.onclick = function () {
				editPhotos.splice(k, 1);
				drawThumbs();
			};
			f.appendChild(im);
			f.appendChild(x);
			box.appendChild(f);
		});
	}
	function resetForm() {
		editingId = null;
		editPhotos = [];
		drawThumbs();
		$("ed-form").reset();
		$("ed-title").textContent = "Add a listing";
		$("ed-save").textContent = "Save listing";
	}
	function startEdit(id) {
		var l = listings.find(function (x) {
			return x.id === id;
		});
		if (!l) return;
		editingId = id;
		$("ed-title").textContent = "Edit listing";
		$("ed-save").textContent = "Save changes";
		$("f-address").value = l.address || "";
		$("f-city").value = l.city || "";
		$("f-price").value = l.price || "";
		$("f-type").value = l.type || "sale";
		$("f-status").value = l.status || "active";
		$("f-beds").value = l.beds || "";
		$("f-baths").value = l.baths || "";
		$("f-link").value = l.link || "";
		$("f-photo").value = "";
		editPhotos = photosOf(l);
		drawThumbs();
		$("f-address").focus();
	}
	$("manage-btn").onclick = function () {
		var ed = $("editor");
		ed.hidden = !ed.hidden;
		if (!ed.hidden) $("f-address").focus();
	};
	$("ed-cancel").onclick = function () {
		resetForm();
		$("ed-msg").textContent = "";
	};
	$("ed-form").addEventListener("submit", async function (ev) {
		ev.preventDefault();
		var msg = $("ed-msg"),
			addr = $("f-address").value.trim();
		if (!addr) {
			msg.textContent = "Add an address to save the listing.";
			$("f-address").focus();
			return;
		}
		var prev = editingId
			? listings.find(function (x) {
					return x.id === editingId;
				})
			: null;
		var rec = {
			id: editingId || "l" + Date.now().toString(36),
			address: addr,
			city: $("f-city").value.trim(),
			price: $("f-price").value.replace(/[^0-9.]/g, ""),
			type: $("f-type").value,
			status: $("f-status").value,
			beds: $("f-beds").value.trim(),
			baths: $("f-baths").value.trim(),
			link: $("f-link").value.trim(),
			photos: editPhotos.slice(),
		};
		var files = Array.prototype.slice.call($("f-photo").files || []);
		$("ed-save").disabled = true;
		if (files.length) {
			if (!assetsNS) {
				msg.textContent =
					"Photo uploads are not available here. Saved without new photos.";
			} else {
				for (var k = 0; k < files.length; k++) {
					msg.textContent =
						"Uploading photo " +
						(k + 1) +
						" of " +
						files.length +
						"…";
					try {
						var up = await assetsNS.upload(files[k]);
						rec.photos.push(up.id);
					} catch (e) {
						msg.textContent =
							"Photo " +
							(k + 1) +
							" could not be uploaded (" +
							((e && e.code) || "error") +
							"). Try a smaller image.";
						$("ed-save").disabled = false;
						return;
					}
				}
			}
		}
		if (prev)
			listings = listings.map(function (x) {
				return x.id === rec.id ? rec : x;
			});
		else listings.unshift(rec);
		save(prev ? "Listing updated." : "Listing added.");
	});

	function esc(s) {
		return s.replace(/</g, "\\u003c");
	}
	async function save(okText) {
		var msg = $("ed-msg");
		msg.textContent = "Publishing…";
		var body = PRISTINE.replace(
			/(<script type="application\/json" id="listings-data">)[\s\S]*?(<\/script>)/,
			function (_, a, b) {
				return a + esc(JSON.stringify(listings)) + b;
			},
		);
		var doc =
			'<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,-apple-system,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>' +
			body +
			"</body></html>";
		try {
			await artifactNS.publish(doc);
			msg.textContent =
				okText + " The page is reloading with the update.";
		} catch (e) {
			$("ed-save").disabled = false;
			var c = e && e.code;
			msg.textContent =
				c === "conflict"
					? "Someone else saved at the same time. The page will reload; please re-enter your change."
					: c === "not_writer" || c === "not_granted"
						? "You need edit access to this page to change listings."
						: "Could not publish (" +
							(c || "error") +
							"). Try again.";
		}
	}

	(async function () {
		if (!window.claude || !window.claude.use) return;
		var res = await Promise.all([
			claude.use("artifact"),
			claude.use("user"),
			claude.use("assets"),
		]);
		artifactNS = res[0];
		var user = res[1];
		assetsNS = res[2];
		var canEdit = false;
		try {
			canEdit = !!(user && (await user.canEdit()));
		} catch (e) {}
		if (artifactNS && canEdit) {
			$("manage-row").hidden = false;
		}
	})();

	applyLang();

	// ----- Interactions -----
	var top = document.querySelector(".top"),
		fab = $("fab"),
		hero = document.querySelector(".hero");
	function onScroll() {
		var y = window.scrollY || 0;
		top.classList.toggle("scrolled", y > 8);
		if (fab && hero)
			fab.classList.toggle(
				"show",
				y > hero.offsetTop + hero.offsetHeight - 80 &&
					window.innerHeight + y < document.body.scrollHeight - 260,
			);
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
	// mobile menu
	var mb = $("menu-btn"),
		mn = $("mnav");
	function setMenu(o) {
		mb.setAttribute("aria-expanded", o);
		mn.hidden = !o;
	}
	mb.onclick = function () {
		setMenu(mn.hidden);
	};
	mn.addEventListener("click", function (e) {
		if (e.target.closest("a")) setMenu(false);
	});
	// active section in nav
	if ("IntersectionObserver" in window) {
		var links = [].slice.call(document.querySelectorAll(".nav a"));
		var io = new IntersectionObserver(
			function (es) {
				es.forEach(function (e) {
					if (e.isIntersecting) {
						links.forEach(function (a) {
							a.classList.toggle(
								"on",
								a.getAttribute("href") === "#" + e.target.id,
							);
						});
					}
				});
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		["services", "listings", "team", "contact"].forEach(function (id) {
			var el = $(id);
			if (el) io.observe(el);
		});
		// reveal on scroll: only elements that start below the fold
		var rm =
			window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!rm) {
			var rv = new IntersectionObserver(
				function (es) {
					es.forEach(function (e) {
						if (e.isIntersecting) {
							e.target.classList.add("in");
							rv.unobserve(e.target);
						}
					});
				},
				{ rootMargin: "0px 0px -8% 0px" },
			);
			document
				.querySelectorAll(
					".sc, .card, .sec-head, .team-img, .team-names > div, .contact .left > *, .office",
				)
				.forEach(function (el, i) {
					if (el.getBoundingClientRect().top > window.innerHeight) {
						el.classList.add("reveal");
						el.style.transitionDelay = (i % 4) * 70 + "ms";
						rv.observe(el);
					}
				});
		}
	}

	// service cards: tap to open on touch screens
	document.querySelectorAll(".sc:not(.sc-cta)").forEach(function (c) {
		c.addEventListener("click", function (e) {
			if (e.target.closest("a")) return;
			var o = !c.classList.contains("open");
			document.querySelectorAll(".sc.open").forEach(function (x) {
				x.classList.remove("open");
			});
			c.classList.toggle("open", o);
		});
		c.addEventListener("keydown", function (e) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				c.click();
			}
		});
	});
	// lightbox for listing photos
	var lb = $("lb"),
		lbImg = lb.querySelector("img"),
		lbCnt = lb.querySelector(".cnt"),
		lbList = [],
		lbI = 0,
		lbLast = null;
	function lbShow() {
		lbImg.src = lbList[lbI].src;
		lbImg.alt = lbList[lbI].alt;
		lbCnt.textContent = lbI + 1 + " / " + lbList.length;
	}
	function lbOpen(list, i) {
		lbList = list;
		lbI = i;
		lbLast = document.activeElement;
		lbShow();
		lb.hidden = false;
		requestAnimationFrame(function () {
			lb.classList.add("open");
		});
		document.body.style.overflow = "hidden";
		lb.querySelector(".x").focus();
	}
	function lbClose() {
		lb.classList.remove("open");
		lb.hidden = true;
		document.body.style.overflow = "";
		if (lbLast) lbLast.focus();
	}
	function lbGo(d) {
		lbI = (lbI + d + lbList.length) % lbList.length;
		lbShow();
	}
	lb.querySelector(".x").onclick = lbClose;
	lb.querySelector(".p").onclick = function () {
		lbGo(-1);
	};
	lb.querySelector(".n").onclick = function () {
		lbGo(1);
	};
	lb.addEventListener("click", function (e) {
		if (e.target === lb) lbClose();
	});
	document.addEventListener("keydown", function (e) {
		if (lb.hidden) {
			if (e.key === "Escape" && !mn.hidden) setMenu(false);
			return;
		}
		if (e.key === "Escape") lbClose();
		if (e.key === "ArrowLeft") lbGo(-1);
		if (e.key === "ArrowRight") lbGo(1);
	});
	var sx = null;
	lb.addEventListener(
		"touchstart",
		function (e) {
			sx = e.touches[0].clientX;
		},
		{ passive: true },
	);
	lb.addEventListener("touchend", function (e) {
		if (sx == null) return;
		var dx = e.changedTouches[0].clientX - sx;
		if (Math.abs(dx) > 40) lbGo(dx < 0 ? 1 : -1);
		sx = null;
	});
	$("grid").addEventListener("click", function (e) {
		var im = e.target.closest(".track img");
		if (!im) return;
		var list = [].slice
			.call(im.parentNode.querySelectorAll("img"))
			.map(function (x) {
				return { src: x.src, alt: x.alt };
			});
		lbOpen(list, [].indexOf.call(im.parentNode.children, im));
	});
})();
