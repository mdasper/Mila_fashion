import React from 'react';
import { X, MessageCircle } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="size-guide-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="size-guide-header">
          <span className="section-tag">FIT & SIZING</span>
          <h3>Mila Fashions Standard Size Guide</h3>
          <p>All body measurements are listed in inches. Custom tailoring available.</p>
        </div>

        <div className="table-responsive">
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust</th>
                <th>Waist</th>
                <th>Hip</th>
                <th>Standard UK / India</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>XS</strong></td>
                <td>32"</td>
                <td>26"</td>
                <td>35"</td>
                <td>UK 6 / IND 32</td>
              </tr>
              <tr>
                <td><strong>S</strong></td>
                <td>34"</td>
                <td>28"</td>
                <td>37"</td>
                <td>UK 8 / IND 34</td>
              </tr>
              <tr>
                <td><strong>M</strong></td>
                <td>36"</td>
                <td>30"</td>
                <td>39"</td>
                <td>UK 10 / IND 36</td>
              </tr>
              <tr>
                <td><strong>L</strong></td>
                <td>38"</td>
                <td>32"</td>
                <td>41"</td>
                <td>UK 12 / IND 38</td>
              </tr>
              <tr>
                <td><strong>XL</strong></td>
                <td>40"</td>
                <td>34"</td>
                <td>43"</td>
                <td>UK 14 / IND 40</td>
              </tr>
              <tr>
                <td><strong>XXL</strong></td>
                <td>42"</td>
                <td>36"</td>
                <td>45"</td>
                <td>UK 16 / IND 42</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px' }}>
          <a
            href="https://wa.me/919876543210?text=Hello%20Mila%20Fashions,%20I%20would%20like%20custom%20size%20consultation"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-block"
            style={{ color: 'var(--palette-forest-dark)', borderColor: 'var(--palette-forest-dark)' }}
          >
            <MessageCircle size={16} /> Consult with Master Tailor on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
