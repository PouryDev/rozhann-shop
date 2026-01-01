import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/sanctumAuth";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { useSeo } from "../hooks/useSeo";

function CampaignPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCampaignProducts = useCallback(
        async (page = 1, append = false) => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (page > 1) params.set("page", page);

                const res = await apiRequest(
                    `/api/campaigns/${id}/products?${params.toString()}`
                );

                if (!res.ok) {
                    if (res.status === 404) {
                        navigate("/404", { replace: true });
                    }
                    throw new Error("failed");
                }

                const data = await res.json();

                if (data.success) {
                    setCampaign(data.campaign);
                    if (append) {
                        setProducts((prev) => [...prev, ...data.data]);
                    } else {
                        setProducts(data.data);
                    }
                    setHasMorePages(data.pagination.has_more_pages);
                    setCurrentPage(page);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        },
        [id, navigate]
    );

    useEffect(() => {
        fetchCampaignProducts(1);
    }, [fetchCampaignProducts]);

    const loadMore = () => {
        if (!loading && hasMorePages) {
            fetchCampaignProducts(currentPage + 1, true);
        }
    };

    const formatPrice = (v) => {
        try {
            return Number(v || 0).toLocaleString("fa-IR");
        } catch {
            return v;
        }
    };

    useSeo({
        title: campaign ? `${campaign.name} - فروشگاه روژان` : "کمپین - روژان",
        description: campaign?.description || "مشاهده محصولات کمپین",
        keywords: campaign ? `${campaign.name}, تخفیف, خرید آنلاین` : "",
        canonical: window.location.origin + window.location.pathname,
    });

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
            {/* Header */}
            <section className="relative py-6 md:py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-[var(--color-primary-strong)] hover:opacity-80 text-sm mb-3 flex items-center gap-1 transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        بازگشت
                    </button>
                    {campaign ? (
                        <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-[var(--color-border-subtle)]">
                            <div className="relative h-32 md:h-40 overflow-hidden" style={{ background: "linear-gradient(120deg, rgba(255,238,209,0.9), rgba(232,246,238,0.9))" }}>
                                <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
                                    <div>
                                        <h1 className="text-xl md:text-3xl font-extrabold text-[var(--color-text)] mb-2">
                                            {campaign.name}
                                        </h1>
                                        {campaign.type === "percentage" && (
                                            <div className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-bold" style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))" }}>
                                                {campaign.discount_value}% تخفیف
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {campaign.description && (
                                <div className="p-4 md:p-5 bg-white">
                                    <p className="text-[var(--color-text-muted)] text-sm">
                                        {campaign.description}
                                    </p>
                                    <div className="text-xs text-[var(--color-text-muted)] mt-2">
                                        تا{" "}
                                        {new Date(
                                            campaign.ends_at
                                        ).toLocaleDateString("fa-IR")}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white shadow-lg p-5 border border-[var(--color-border-subtle)]">
                            <div className="text-[var(--color-text-muted)]">
                                در حال بارگذاری...
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    {loading && products.length === 0 ? (
                        <div className="flex justify-center py-12">
                            <LoadingSpinner />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                                محصولی یافت نشد
                            </h3>
                            <p className="text-[var(--color-text-muted)]">
                                در این کمپین محصولی وجود ندارد
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {hasMorePages && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={loadMore}
                                        disabled={loading}
                                        className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                                        style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))", boxShadow: "0 10px 25px rgba(244,172,63,0.35)" }}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <LoadingSpinner size="sm" />
                                                <span>در حال بارگذاری...</span>
                                            </span>
                                        ) : (
                                            "مشاهده بیشتر"
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default CampaignPage;
