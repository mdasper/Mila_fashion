import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Truck, ShieldCheck, MessageCircle } from 'lucide-react';

export default function Perks() {
  const perks = [
    {
      icon: <Gem size={22} />,
      title: "100% Handloom & Pure Silks",
      desc: "Authentic Kanchipuram, Chanderi & Banarasi"
    },
    {
      icon: <Truck size={22} />,
      title: "Complimentary Express Delivery",
      desc: "Delivered within 2–4 days across India"
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Bank-Grade Encrypted Checkout",
      desc: "UPI, Cards, NetBanking & Doorstep COD"
    },
    {
      icon: <MessageCircle size={22} />,
      title: "Personal Stylist on WhatsApp",
      desc: "Direct blouse & measurement guidance"
    }
  ];

  return (
    <section className="perks-bar">
      {perks.map((p, idx) => (
        <motion.div
          className="perk-item"
          key={idx}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="perk-icon-wrap">{p.icon}</div>
          <div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
