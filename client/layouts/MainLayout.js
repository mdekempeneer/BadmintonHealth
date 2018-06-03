import React from 'react';
import Button from 'material-ui/Button';

// components
import ButtonAppBar from '../../imports/ui/components/ButtonAppBar.js';

export const MainLayout = ({content}) => (
    <div className="container">
        <ButtonAppBar />
        <main>
            {content}
        </main>
    </div>
)
