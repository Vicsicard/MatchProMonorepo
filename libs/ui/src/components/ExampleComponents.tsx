import React from 'react';

export const StyleShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Buttons */}
      <section>
        <h2>Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-danger">Danger</button>
          <button className="btn btn-outline">Outline</button>
        </div>
      </section>

      {/* Form Controls */}
      <section>
        <h2>Form Controls</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="label" htmlFor="example-input">Input</label>
            <input id="example-input" type="text" className="input" placeholder="Type something..." />
          </div>
          <div>
            <label className="label" htmlFor="example-select">Select</label>
            <select id="example-select" className="select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2>Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="card shadow-hover">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Card Title</h3>
            </div>
            <div className="card-body">
              <p>This is a card with hover effect.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Action</button>
            </div>
          </div>
          <div className="card grow-hover">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Growing Card</h3>
            </div>
            <div className="card-body">
              <p>This card grows on hover.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline">Action</button>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2>Badges</h2>
        <div className="flex flex-wrap gap-4">
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-danger">Danger</span>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2>Alerts</h2>
        <div className="space-y-4 max-w-2xl">
          <div className="alert alert-info">
            <p>This is an informational alert.</p>
          </div>
          <div className="alert alert-success">
            <p>This is a success alert.</p>
          </div>
          <div className="alert alert-warning">
            <p>This is a warning alert.</p>
          </div>
          <div className="alert alert-danger">
            <p>This is a danger alert.</p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section>
        <h2>Animations</h2>
        <div className="space-y-4">
          <div className="animate-fade-in bg-primary/10 p-4 rounded">
            Fade In
          </div>
          <div className="animate-slide-in bg-secondary/10 p-4 rounded">
            Slide In
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleShowcase;
